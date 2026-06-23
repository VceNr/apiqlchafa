import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as ws from 'ws';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WsTransport = ws.WebSocket as any;

@Injectable()
export class SupabaseService {
  private client: SupabaseClient;
  private adminClient: SupabaseClient;

  constructor(private configService: ConfigService) {
    const url = this.configService.getOrThrow<string>('SUPABASE_URL');
    const publishableKey = this.configService.getOrThrow<string>('SUPABASE_PUBLISHABLE_KEY');
    const secretKey = this.configService.getOrThrow<string>('SUPABASE_SECRET_KEY');

    // Cliente con publishable key (respeta RLS)
    this.client = createClient(url, publishableKey, {
      realtime: { transport: WsTransport },
    });

    // Admin client que bypasea RLS — solo para operaciones server-side
    this.adminClient = createClient(url, secretKey, {
      auth: { autoRefreshToken: false, persistSession: false },
      realtime: { transport: WsTransport },
    });
  }

  /** Cliente con RLS. Pasa el JWT del usuario para actuar como él. */
  getClient(accessToken?: string): SupabaseClient {
    if (accessToken) {
      const url = this.configService.getOrThrow<string>('SUPABASE_URL');
      const publishableKey = this.configService.getOrThrow<string>('SUPABASE_PUBLISHABLE_KEY');
      return createClient(url, publishableKey, {
        global: { headers: { Authorization: `Bearer ${accessToken}` } },
        realtime: { transport: WsTransport },
      });
    }
    return this.client;
  }

  /** Admin client — bypasea RLS. Nunca exponer al browser. */
  getAdminClient(): SupabaseClient {
    return this.adminClient;
  }
}
