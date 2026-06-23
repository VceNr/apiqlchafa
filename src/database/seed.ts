import { AppDataSource } from './data-source';
import * as bcrypt from 'bcryptjs';

async function seed() {
  console.log('🌱 Conectando a la base de datos...');
  await AppDataSource.initialize();
  console.log('✅ Conexión establecida\n');

  const q = AppDataSource.createQueryRunner();

  // ─── LIMPIAR TABLAS ────────────────────────────────────────────────────────
  console.log('🗑️  Limpiando tablas existentes...');
  await q.query(`TRUNCATE TABLE
    horas_proyecto, tareas_proyecto, proyectos,
    lineas_produccion, ordenes_produccion,
    asientos_contables, facturas,
    movimientos_financieros, cuentas_bancarias,
    movimientos_inventario, productos,
    ordenes_compra, proveedores,
    ordenes_venta, vendedores,
    clientes,
    logs_auditoria, alertas_seguridad,
    reportes,
    configuracion_notificaciones, integraciones, configuracion_general,
    empleados, departamentos,
    usuarios
    RESTART IDENTITY CASCADE`);
  console.log('✅ Tablas limpias\n');

  // ─── USUARIOS ─────────────────────────────────────────────────────────────
  console.log('👤 Insertando usuarios...');
  const hash = await bcrypt.hash('Admin1234!', 10);
  await q.query(`
    INSERT INTO usuarios (username, password_hash, nombre, rol, activo, ultimo_acceso) VALUES
    ('admin',      '${hash}', 'Administrador Sistema', 'admin',     true, NOW()),
    ('jcarrasco',  '${hash}', 'Juan Carrasco Vega',    'gerente',   true, NOW()),
    ('mrojas',     '${hash}', 'María Rojas Pérez',     'contador',  true, NOW()),
    ('pmorales',   '${hash}', 'Pablo Morales Silva',   'vendedor',  true, NOW()),
    ('cgonzalez',  '${hash}', 'Carla González Torres', 'bodeguero', true, NOW())
  `);

  // ─── DEPARTAMENTOS ────────────────────────────────────────────────────────
  console.log('🏢 Insertando departamentos...');
  await q.query(`
    INSERT INTO departamentos (nombre, jefe, total_empleados) VALUES
    ('Gerencia General',      'Juan Carrasco Vega',     3),
    ('Ventas',                'Roberto Fuentes Lagos',  8),
    ('Compras y Logística',   'Ana Sepúlveda Muñoz',    5),
    ('Contabilidad',          'María Rojas Pérez',      4),
    ('Recursos Humanos',      'Claudia Herrera Díaz',   3),
    ('Producción',            'Fernando Araya Castro',  12),
    ('Tecnología',            'Sebastián Vidal Reyes',  4)
  `);

  // ─── EMPLEADOS ────────────────────────────────────────────────────────────
  console.log('👥 Insertando empleados...');
  await q.query(`
    INSERT INTO empleados (nombre, cargo, departamento, fecha_ingreso, estado, email, telefono, fecha_nacimiento, salario, activo) VALUES
    ('Juan Carrasco Vega',      'Gerente General',          'Gerencia General',    '2018-03-01', 'activo', 'jcarrasco@empresa.cl',   '+56912345001', '1975-04-15', 3500000, true),
    ('Roberto Fuentes Lagos',   'Jefe de Ventas',           'Ventas',              '2019-06-15', 'activo', 'rfuentes@empresa.cl',    '+56912345002', '1980-07-22', 2200000, true),
    ('Ana Sepúlveda Muñoz',     'Jefa de Compras',          'Compras y Logística', '2019-08-01', 'activo', 'asepulveda@empresa.cl',  '+56912345003', '1982-02-10', 2100000, true),
    ('María Rojas Pérez',       'Contadora General',        'Contabilidad',        '2020-01-10', 'activo', 'mrojas@empresa.cl',      '+56912345004', '1985-11-30', 2000000, true),
    ('Claudia Herrera Díaz',    'Jefa de RRHH',             'Recursos Humanos',    '2020-03-15', 'activo', 'cherrera@empresa.cl',    '+56912345005', '1983-06-18', 1900000, true),
    ('Fernando Araya Castro',   'Jefe de Producción',       'Producción',          '2018-11-01', 'activo', 'faraya@empresa.cl',      '+56912345006', '1978-09-05', 2300000, true),
    ('Sebastián Vidal Reyes',   'Jefe de TI',               'Tecnología',          '2021-02-01', 'activo', 'svidal@empresa.cl',      '+56912345007', '1990-12-25', 2000000, true),
    ('Pablo Morales Silva',     'Ejecutivo de Ventas',      'Ventas',              '2020-07-01', 'activo', 'pmorales@empresa.cl',    '+56912345008', '1992-03-14', 1200000, true),
    ('Daniela Castro Lira',     'Ejecutiva de Ventas',      'Ventas',              '2021-01-15', 'activo', 'dcastro@empresa.cl',     '+56912345009', '1993-08-07', 1200000, true),
    ('Rodrigo Pinto Vargas',    'Analista Contable',        'Contabilidad',        '2021-04-01', 'activo', 'rpinto@empresa.cl',      '+56912345010', '1991-05-19', 1100000, true),
    ('Valentina Ríos Mora',     'Analista de RRHH',         'Recursos Humanos',    '2022-01-10', 'activo', 'vrios@empresa.cl',       '+56912345011', '1994-01-28', 1000000, true),
    ('Cristóbal Mena Torres',   'Operador Producción',      'Producción',          '2020-08-15', 'activo', 'cmena@empresa.cl',       '+56912345012', '1989-10-03', 850000, true),
    ('Laura Jiménez Soto',      'Operadora Producción',     'Producción',          '2020-09-01', 'activo', 'ljimenez@empresa.cl',    '+56912345013', '1991-07-11', 850000, true),
    ('Andrés Flores Campos',    'Logística',                'Compras y Logística', '2021-06-01', 'activo', 'aflores@empresa.cl',     '+56912345014', '1988-04-22', 950000, true),
    ('Isabel Núñez Gallardo',   'Ejecutiva de Ventas',      'Ventas',              '2022-03-01', 'activo', 'inunez@empresa.cl',      '+56912345015', '1995-09-16', 1150000, true),
    ('Maximiliano Vera Ortiz',  'Desarrollador Full Stack', 'Tecnología',          '2022-05-15', 'activo', 'mvera@empresa.cl',       '+56912345016', '1996-06-30', 1400000, true),
    ('Francisca Lagos Bravo',   'Ejecutiva de Ventas',      'Ventas',              '2023-01-09', 'activo', 'flagos@empresa.cl',      '+56912345017', '1997-02-14', 1100000, true),
    ('Héctor Ramírez Muñiz',    'Operador Producción',      'Producción',          '2021-11-01', 'activo', 'hramirez@empresa.cl',    '+56912345018', '1987-12-08', 850000, true),
    ('Natalia Contreras Pino',  'Analista Contable',        'Contabilidad',        '2023-02-01', 'activo', 'ncontreras@empresa.cl',  '+56912345019', '1996-03-21', 1000000, true),
    ('Gonzalo Ibáñez Riquelme', 'Soporte TI',               'Tecnología',          '2023-03-15', 'activo', 'gibanez@empresa.cl',     '+56912345020', '1998-11-05', 950000, true)
  `);

  // ─── VENDEDORES ───────────────────────────────────────────────────────────
  console.log('💼 Insertando vendedores...');
  await q.query(`
    INSERT INTO vendedores (nombre, ventas_total, meta, porcentaje_cumplimiento, activo) VALUES
    ('Roberto Fuentes Lagos',  45200000, 40000000, 113.00, true),
    ('Pablo Morales Silva',    38500000, 40000000,  96.25, true),
    ('Daniela Castro Lira',    41800000, 40000000, 104.50, true),
    ('Isabel Núñez Gallardo',  29700000, 35000000,  84.86, true),
    ('Francisca Lagos Bravo',  22400000, 30000000,  74.67, true),
    ('Rodrigo Pinto Vargas',   18900000, 25000000,  75.60, true),
    ('Valentina Ríos Mora',    35100000, 35000000, 100.29, true),
    ('Cristóbal Mena Torres',  12300000, 20000000,  61.50, true)
  `);

  // ─── CLIENTES ─────────────────────────────────────────────────────────────
  console.log('🏭 Insertando clientes...');
  await q.query(`
    INSERT INTO clientes (nombre, rut, segmento, ultima_orden, deuda, estado, email, telefono, direccion) VALUES
    ('Constructora Vial S.A.',       '76.234.567-8', 'A', '2026-06-18', 4500000, 'activo',   'compras@constructoravial.cl',  '+5622345001', 'Av. Apoquindo 4501, Las Condes'),
    ('Minera del Norte Ltda.',       '77.891.234-5', 'A', '2026-06-15', 8200000, 'activo',   'adm@mineradelnorte.cl',        '+5622345002', 'Av. Libertador 2300, Santiago'),
    ('Supermercados El Sol S.A.',    '79.123.456-7', 'A', '2026-06-20', 1200000, 'activo',   'logistica@elsol.cl',           '+5622345003', 'Ruta 68 Km 15, Pudahuel'),
    ('Retail Moda Express Ltda.',    '76.445.678-9', 'B', '2026-06-10', 3400000, 'activo',   'compras@modaexpress.cl',        '+5622345004', 'Mall Parque Arauco, Las Condes'),
    ('Clínica San Rafael SpA',       '77.334.556-1', 'B', '2026-06-12', 650000,  'activo',   'administracion@sanrafael.cl',   '+5622345005', 'Av. Vitacura 5951, Vitacura'),
    ('Transportes Pacifico Ltda.',   '76.556.789-2', 'B', '2026-06-08', 2100000, 'activo',   'operaciones@transpac.cl',       '+5622345006', 'Camino Lo Boza 150, Pudahuel'),
    ('Ferretería Industrial Sur',    '78.223.445-3', 'C', '2026-05-28', 450000,  'activo',   'pedidos@ferreindsur.cl',        '+5622345007', 'Av. Matta 1840, Santiago'),
    ('Panadería Don Arturo Ltda.',   '76.112.334-4', 'C', '2026-06-01', 180000,  'activo',   'donarturo@gmail.com',           '+5622345008', 'Lord Cochrane 456, Santiago'),
    ('Agricola Los Vilos S.A.',      '79.334.556-5', 'A', '2026-06-17', 5600000, 'activo',   'ventas@agrilosvilos.cl',        '+5622345009', 'Fundo Los Aromos s/n, Los Vilos'),
    ('Hotel Gran Pacífico S.A.',     '77.445.667-6', 'B', '2026-06-14', 1900000, 'activo',   'compras@granpacifico.cl',       '+5622345010', 'Av. Costanera 3200, Viña del Mar'),
    ('Colegio San Ignacio SpA',      '76.667.889-7', 'B', '2026-05-30', 0,       'activo',   'adm@sanignacio.cl',             '+5622345011', 'Av. Tobalaba 1629, Providencia'),
    ('Piscicultura Austral Ltda.',   '78.334.556-8', 'C', '2026-06-05', 320000,  'activo',   'pedidos@pisciculturaustral.cl', '+5622345012', 'Ruta 5 Sur Km 980, Puerto Montt'),
    ('Inmobiliaria Los Robles SpA',  '77.556.778-9', 'A', '2026-06-19', 3800000, 'activo',   'operaciones@losrobles.cl',      '+5622345013', 'El Golf 40, Las Condes'),
    ('Distribuidora Centra S.A.',    '79.667.889-K', 'A', '2026-06-16', 7200000, 'activo',   'logistica@distribcentra.cl',   '+5622345014', 'Av. Las Industrias 2400, Pudahuel'),
    ('Clínica Dental Sonrisas SpA',  '76.889.001-1', 'C', '2026-06-02', 90000,   'activo',   'admin@sonrisasdental.cl',       '+5622345015', 'Av. Irarrázaval 2345, Ñuñoa'),
    ('Bodega Los Nogales S.A.',      '77.001.123-2', 'B', '2026-06-09', 1450000, 'activo',   'compras@noguales.cl',           '+5622345016', 'Camino El Noviciado 1200, Pudahuel'),
    ('Servicios Ambientales Ltda.',  '76.112.234-3', 'B', '2026-06-11', 870000,  'activo',   'adm@servambiental.cl',          '+5622345017', 'Av. Pedro de Valdivia 210, Providencia'),
    ('Fábrica Textiles Norte SpA',   '78.445.667-4', 'A', '2026-06-18', 4100000, 'activo',   'logistica@textilesnorte.cl',   '+5622345018', 'Av. Industrial 3400, Quilicura'),
    ('Consultora Estrategia SpA',    '77.556.889-5', 'C', '2026-05-20', 0,       'activo',   'info@estrategia.cl',            '+5622345019', 'Av. Providencia 1208, Providencia'),
    ('Exportadora Pesca Sur S.A.',   '79.778.900-6', 'A', '2026-06-20', 6900000, 'activo',   'export@pescasur.cl',            '+5622345020', 'Puerto 4, Terminal Pesquero, Coronel')
  `);

  // ─── PROVEEDORES ─────────────────────────────────────────────────────────
  console.log('🚚 Insertando proveedores...');
  await q.query(`
    INSERT INTO proveedores (nombre, categoria, total_ordenes, monto_total, estado, contacto, email, activo) VALUES
    ('Aceros del Pacífico S.A.',     'Materias Primas',    42, 38400000, 'activo', 'Felipe Montoya',  'ventas@acerospacifico.cl',  true),
    ('Química Industrial Norte',     'Insumos Químicos',   28, 22100000, 'activo', 'Lorena Valdés',   'lvaldes@quimnorte.cl',      true),
    ('Envases y Empaques Ltda.',     'Embalaje',           65, 15800000, 'activo', 'Marcos Peña',     'mpeña@envasesem.cl',        true),
    ('Distribuidora Eléctrica Sur',  'Eléctrico',          19, 9700000,  'activo', 'Andrea Figueroa', 'afigueroa@distelsur.cl',    true),
    ('Maquinaria Pesada Norte SpA',  'Maquinaria',          8, 58000000, 'activo', 'René Contreras',  'rcontreras@maqpesada.cl',   true),
    ('Logística Express Ltda.',      'Transporte',         94, 12400000, 'activo', 'Carla Soto',      'csoto@logisticaexpress.cl', true),
    ('Tecnología Industrial SpA',    'Tecnología',         31, 17900000, 'activo', 'Diego Moreno',    'dmoreno@tecindus.cl',       true),
    ('Repuestos Técnicos S.A.',      'Repuestos',          57, 8300000,  'activo', 'Gloria Riquelme', 'griquelme@repuestecnic.cl', true),
    ('Combustibles del Sur Ltda.',   'Combustibles',       48, 31200000, 'activo', 'Hugo Castillo',   'hcastillo@combsur.cl',      true),
    ('Uniformes y Seguridad SpA',    'EPP y Seguridad',    36, 6800000,  'activo', 'Irene Lagos',     'ilagos@uniformseg.cl',      true),
    ('Papelería Corporativa S.A.',   'Oficina',            83, 3200000,  'activo', 'José Bravo',      'jbravo@papelcorp.cl',       true),
    ('Mantención Industrial Ltda.',  'Servicios',          22, 14600000, 'activo', 'Karen Muñoz',     'kmuñoz@mantind.cl',         true),
    ('Software Empresarial SpA',     'Tecnología',         12, 24000000, 'activo', 'Luis Vera',       'lvera@softwemp.cl',         true),
    ('Construcciones Rápidas Ltda.', 'Construcción',        6, 71000000, 'activo', 'Monica Arce',     'marce@construrap.cl',       true),
    ('Catering Empresarial S.A.',    'Alimentación',       72, 5400000,  'activo', 'Nicolás Fuentes', 'nfuentes@catering.cl',      true)
  `);

  // ─── ÓRDENES DE VENTA ─────────────────────────────────────────────────────
  console.log('🧾 Insertando órdenes de venta...');
  const estadosVenta = ['pendiente', 'aprobada', 'despachada', 'entregada', 'facturada', 'cancelada'];
  const ventasValues: string[] = [];
  const clientes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  const montos = [1200000,3400000,890000,5600000,2300000,450000,7800000,1100000,4200000,680000,
                  2900000,520000,3100000,8400000,1700000,390000,6200000,2800000,950000,4700000,
                  1350000,5100000,730000,3800000,1600000,480000,9200000,2100000,4500000,810000];
  for (let i = 0; i < 30; i++) {
    const num = `OV-2026-${String(i+1).padStart(4,'0')}`;
    const cli = clientes[i % clientes.length];
    const monto = montos[i];
    const est = estadosVenta[i % estadosVenta.length];
    const day = String(Math.floor(i/30 * 20) + 1).padStart(2,'0');
    const fecha = `2026-06-${day}`;
    ventasValues.push(`('${num}', ${cli}, ${monto}, '${est}', '${fecha}')`);
  }
  await q.query(`INSERT INTO ordenes_venta (numero, cliente_id, monto, estado, fecha) VALUES ${ventasValues.join(',')}`);

  // ─── ÓRDENES DE COMPRA ─────────────────────────────────────────────────────
  console.log('📦 Insertando órdenes de compra...');
  const estadosOC = ['pendiente', 'aprobada', 'en_transito', 'recibida', 'cancelada'];
  const ocDescs = [
    'Láminas de acero inoxidable calibre 14', 'Resina epóxica industrial 200L', 'Cajas de cartón corrugado 40x30x20',
    'Cable eléctrico 10mm 500m', 'Repuesto bomba hidráulica modelo BH-200', 'Servicio flete Santiago-Antofagasta',
    'Licencias Microsoft 365 Business x20', 'Filtros de aceite motor x50', 'Diésel 5000 litros',
    'Chalecos reflectantes y cascos EPP x30', 'Resmas papel A4 x100', 'Servicio mantención preventiva prensa',
    'Módulo ERP contabilidad avanzada', 'Soldadura MIG alambre 1.2mm 100kg', 'Servicio catering ejecutivo junio',
    'Tubería PVC 110mm x200m', 'Tornillería industrial surtida 50kg', 'Lubricante industrial 20L x10',
    'Pintura anticorrosiva 200L', 'Correas trapezoidales surtidas x40'
  ];
  const ocValues: string[] = [];
  for (let i = 0; i < 20; i++) {
    const num = `OC-2026-${String(i+1).padStart(4,'0')}`;
    const prov = (i % 15) + 1;
    const desc = ocDescs[i];
    const monto = [980000,3400000,720000,1500000,4800000,890000,6200000,380000,4100000,560000,
                   240000,2900000,8400000,5600000,1200000,1800000,340000,720000,2100000,490000][i];
    const est = estadosOC[i % estadosOC.length];
    const addDays = i * 3;
    const d = new Date('2026-06-01');
    d.setDate(d.getDate() + addDays);
    const entrega = d.toISOString().split('T')[0];
    ocValues.push(`('${num}', ${prov}, '${desc}', ${monto}, '${est}', '${entrega}')`);
  }
  await q.query(`INSERT INTO ordenes_compra (numero, proveedor_id, descripcion, monto, estado, fecha_entrega) VALUES ${ocValues.join(',')}`);

  // ─── PRODUCTOS ────────────────────────────────────────────────────────────
  console.log('📦 Insertando productos...');
  await q.query(`
    INSERT INTO productos (sku, nombre, stock_actual, stock_minimo, categoria, precio, estado) VALUES
    ('ACE-001', 'Lámina Acero Inoxidable 304 1.2mm',    145, 50,  'Materias Primas',  89000,  'activo'),
    ('ACE-002', 'Tubo Acero Galvanizado 2"',             230, 80,  'Materias Primas',  34000,  'activo'),
    ('ACE-003', 'Perfil Ángulo 40x40x3mm',               89, 100, 'Materias Primas',  18500,  'critico'),
    ('QUI-001', 'Resina Epóxica Bicomponente 1L',        312, 50,  'Insumos Químicos', 12800,  'activo'),
    ('QUI-002', 'Solvente Industrial Tipo A 20L',         78, 40,  'Insumos Químicos', 28400,  'activo'),
    ('QUI-003', 'Pintura Anticorrosiva Gris 4L',          22, 30,  'Insumos Químicos', 15600,  'critico'),
    ('EMB-001', 'Caja Cartón 60x40x40cm',               890, 200, 'Embalaje',         1200,   'activo'),
    ('EMB-002', 'Cinta Adhesiva Industrial 48mm x 150m', 445, 100, 'Embalaje',         3800,   'activo'),
    ('EMB-003', 'Burbuja Plástica Rollo 1.2m x 100m',    67, 20,  'Embalaje',         24000,  'activo'),
    ('ELE-001', 'Cable Eléctrico THHN 10AWG Rojo 100m',  34, 50,  'Eléctrico',        38000,  'critico'),
    ('ELE-002', 'Interruptor Termomagnético 32A',        156, 30,  'Eléctrico',        12400,  'activo'),
    ('ELE-003', 'Tablero Eléctrico 12 circuitos',         45, 10,  'Eléctrico',        89000,  'activo'),
    ('MAQ-001', 'Filtro Aceite Motor Hidráulico',        201, 40,  'Repuestos',        8900,   'activo'),
    ('MAQ-002', 'Correa Trapecial B-78',                  89, 20,  'Repuestos',        4500,   'activo'),
    ('MAQ-003', 'Rodamiento SKF 6205-2RS',               134, 30,  'Repuestos',        6800,   'activo'),
    ('LUB-001', 'Aceite Hidráulico ISO 46 20L',          67, 20,  'Lubricantes',      28000,  'activo'),
    ('LUB-002', 'Grasa Multipropósito NLGI 2 1kg',      312, 50,  'Lubricantes',      4200,   'activo'),
    ('SEG-001', 'Casco Seguridad Blanco ANSI',            45, 20,  'EPP',              12000,  'activo'),
    ('SEG-002', 'Guantes Cuero Caña Larga Par',          234, 60,  'EPP',              3800,   'activo'),
    ('SEG-003', 'Zapatos Seguridad Punta Acero 42',       18, 25,  'EPP',              68000,  'critico'),
    ('PAP-001', 'Resma Papel A4 75g 500 hojas',          456, 100, 'Oficina',          3500,   'activo'),
    ('PAP-002', 'Tóner HP LaserJet M402',                 23, 10,  'Oficina',          48000,  'activo'),
    ('PAP-003', 'Archivador Palanca Ancho Lomo',          89, 30,  'Oficina',          2800,   'activo'),
    ('ALI-001', 'Café Instantáneo 200g',                 167, 50,  'Alimentación',     4900,   'activo'),
    ('ALI-002', 'Agua Purificada 20L Bidón',              45, 20,  'Alimentación',     3200,   'activo'),
    ('HER-001', 'Taladro Percutor 850W Bosch',            12, 5,   'Herramientas',    189000,  'activo'),
    ('HER-002', 'Esmeril Angular 9" 2200W',               8,  5,   'Herramientas',    145000,  'activo'),
    ('HER-003', 'Llave Torquímetro 1/2" 20-200Nm',        6,  3,   'Herramientas',    98000,   'activo'),
    ('TEC-001', 'Memoria USB 32GB Kingston',              78, 20,  'Tecnología',       8900,   'activo'),
    ('TEC-002', 'Monitor 24" Full HD Samsung',             5,  3,   'Tecnología',     189000,  'activo')
  `);

  // ─── MOVIMIENTOS INVENTARIO ───────────────────────────────────────────────
  console.log('🔄 Insertando movimientos de inventario...');
  const tiposInv = ['entrada','salida','ajuste'];
  const usuarios = ['pmorales','jcarrasco','cgonzalez','mrojas'];
  const notasInv = ['Recepción OC','Despacho OV','Ajuste inventario cíclico','Merma proceso','Devolución cliente','Transferencia bodega'];
  const invValues: string[] = [];
  for (let i = 0; i < 40; i++) {
    const tipo = tiposInv[i % 3];
    const prod = (i % 30) + 1;
    const cant = (tipo === 'salida' ? -1 : 1) * (Math.floor(i/40 * 90) + 5);
    const usr = usuarios[i % usuarios.length];
    const nota = notasInv[i % notasInv.length];
    invValues.push(`('${tipo}', ${prod}, ${Math.abs(cant)}, '${usr}', '${nota}')`);
  }
  await q.query(`INSERT INTO movimientos_inventario (tipo, producto_id, cantidad, usuario, nota) VALUES ${invValues.join(',')}`);

  // ─── CUENTAS BANCARIAS ────────────────────────────────────────────────────
  console.log('🏦 Insertando cuentas bancarias...');
  await q.query(`
    INSERT INTO cuentas_bancarias (banco, tipo, saldo, numero_cuenta, activo) VALUES
    ('Banco de Chile',        'Cuenta Corriente', 48200000, '000-123456-78', true),
    ('Banco BCI',             'Cuenta Corriente', 31500000, '40000-123-4',   true),
    ('Banco Santander',       'Cuenta Vista',     12800000, '5100-12345678', true),
    ('Banco Estado',          'Cuenta Corriente', 9700000,  '1100-123456-7', true)
  `);

  // ─── MOVIMIENTOS FINANCIEROS ──────────────────────────────────────────────
  console.log('💰 Insertando movimientos financieros...');
  const conceptosIngreso = ['Pago factura Constructora Vial','Abono Minera del Norte','Cobro Supermercados El Sol',
    'Pago anticipado Agrícola Los Vilos','Cobro Distribuidora Centra','Cobro exportación Pesca Sur'];
  const conceptosGasto = ['Pago planilla semanal','Pago OC Aceros del Pacífico','Pago arriendo bodega Pudahuel',
    'Pago servicios básicos','Pago mantención preventiva','Pago catering corporativo','Pago combustible flota'];
  const cuentas = ['Banco de Chile CC','Banco BCI CC','Banco Santander CV'];
  const mfValues: string[] = [];
  for (let i = 0; i < 35; i++) {
    const esIngreso = i % 3 !== 0;
    const tipo = esIngreso ? 'ingreso' : 'gasto';
    const concepto = esIngreso
      ? conceptosIngreso[i % conceptosIngreso.length]
      : conceptosGasto[i % conceptosGasto.length];
    const monto = esIngreso
      ? [4500000,8200000,1200000,5600000,7200000,6900000,2900000,3400000,1100000,4200000][i % 10]
      : [4800000,3200000,890000,240000,2900000,1200000,680000][i % 7];
    const cuenta = cuentas[i % cuentas.length];
    const d = new Date('2026-06-01');
    d.setDate(d.getDate() + (i % 20));
    const fecha = d.toISOString().split('T')[0];
    mfValues.push(`('${fecha}', '${concepto}', '${tipo}', ${monto}, '${cuenta}')`);
  }
  await q.query(`INSERT INTO movimientos_financieros (fecha, concepto, tipo, monto, cuenta) VALUES ${mfValues.join(',')}`);

  // ─── FACTURAS ─────────────────────────────────────────────────────────────
  console.log('🧾 Insertando facturas...');
  const estadosFact = ['pendiente','pagada','vencida','anulada'];
  const nombresFactura = [
    'Constructora Vial S.A.','Minera del Norte Ltda.','Supermercados El Sol S.A.','Agrícola Los Vilos S.A.',
    'Distribuidora Centra S.A.','Aceros del Pacífico S.A.','Química Industrial Norte','Logística Express Ltda.',
    'Hotel Gran Pacífico S.A.','Fábrica Textiles Norte SpA'
  ];
  const factValues: string[] = [];
  for (let i = 0; i < 25; i++) {
    const num = `F-2026-${String(i+1).padStart(5,'0')}`;
    const nombre = nombresFactura[i % nombresFactura.length];
    const tipo = i % 3 === 0 ? 'compra' : 'venta';
    const monto = [1200000,4500000,890000,3200000,7800000,2100000,560000,4900000,1600000,8400000,
                   2800000,430000,6100000,1900000,3700000,950000,5300000,2400000,780000,4100000,
                   1450000,8900000,2600000,680000,3500000][i];
    const est = estadosFact[i % estadosFact.length];
    const d = new Date('2026-06-01');
    d.setDate(d.getDate() + (i * 2) % 30);
    const venc = d.toISOString().split('T')[0];
    factValues.push(`('${num}', '${nombre}', '${tipo}', ${monto}, '${est}', '${venc}')`);
  }
  await q.query(`INSERT INTO facturas (numero, cliente_proveedor, tipo, monto, estado, fecha_vencimiento) VALUES ${factValues.join(',')}`);

  // ─── ASIENTOS CONTABLES ───────────────────────────────────────────────────
  console.log('📒 Insertando asientos contables...');
  const cuentasContables = [
    'Caja y Bancos','Cuentas por Cobrar','Inventario','Activo Fijo',
    'Cuentas por Pagar','Capital Social','Ingresos por Ventas','Costo de Ventas',
    'Gastos de Administración','Gastos de Venta','IVA Débito Fiscal','IVA Crédito Fiscal'
  ];
  const asientoValues: string[] = [];
  for (let i = 0; i < 20; i++) {
    const num = `AC-2026-${String(i+1).padStart(4,'0')}`;
    const cuenta = cuentasContables[i % cuentasContables.length];
    const debe = i % 2 === 0 ? [4500000,1200000,8900000,3400000,2100000,5600000,780000,9200000,1800000,4300000][i % 10] : 0;
    const haber = i % 2 !== 0 ? [4500000,1200000,8900000,3400000,2100000,5600000,780000,9200000,1800000,4300000][i % 10] : 0;
    const d = new Date('2026-06-01');
    d.setDate(d.getDate() + i);
    const fecha = d.toISOString().split('T')[0];
    const desc = `Registro ${i % 2 === 0 ? 'cargo' : 'abono'} cuenta ${cuenta} junio 2026`;
    asientoValues.push(`('${num}', '${cuenta}', ${debe}, ${haber}, '${fecha}', '${desc}')`);
  }
  await q.query(`INSERT INTO asientos_contables (numero, cuenta, debe, haber, fecha, descripcion) VALUES ${asientoValues.join(',')}`);

  // ─── LÍNEAS DE PRODUCCIÓN ─────────────────────────────────────────────────
  console.log('🏭 Insertando líneas de producción...');
  await q.query(`
    INSERT INTO lineas_produccion (nombre, eficiencia, estado, unidades_hoy, operador) VALUES
    ('Línea A - Corte y Troquelado', 92.5, 'activa',  340, 'Cristóbal Mena Torres'),
    ('Línea B - Ensamblaje',         87.3, 'activa',  280, 'Laura Jiménez Soto'),
    ('Línea C - Pintura y Acabados', 78.9, 'activa',  195, 'Héctor Ramírez Muñiz'),
    ('Línea D - Control de Calidad', 95.1, 'activa',  425, 'Fernando Araya Castro')
  `);

  // ─── ÓRDENES DE PRODUCCIÓN ────────────────────────────────────────────────
  console.log('⚙️  Insertando órdenes de producción...');
  await q.query(`
    INSERT INTO ordenes_produccion (numero, producto, cantidad, progreso, linea_produccion, estado, fecha_inicio, fecha_fin) VALUES
    ('OP-2026-001', 'Marco Metálico Estándar 120x80cm',  500, 78.50, 'Línea A - Corte y Troquelado', 'en_proceso', '2026-06-10', '2026-06-25'),
    ('OP-2026-002', 'Gabinete Eléctrico IP65 40x30',     200, 45.00, 'Línea B - Ensamblaje',         'en_proceso', '2026-06-12', '2026-06-28'),
    ('OP-2026-003', 'Soporte Mural Reforzado SR-200',    750, 92.00, 'Línea A - Corte y Troquelado', 'en_proceso', '2026-06-08', '2026-06-22'),
    ('OP-2026-004', 'Estructura Rack Servidor 42U',        50, 30.00, 'Línea B - Ensamblaje',         'en_proceso', '2026-06-15', '2026-07-05'),
    ('OP-2026-005', 'Bandeja Portacable Perforada 3m',  1200, 65.00, 'Línea C - Pintura y Acabados', 'en_proceso', '2026-06-11', '2026-06-30'),
    ('OP-2026-006', 'Panel Solar Estructura Fija 10kW',   30, 15.00, 'Línea D - Control de Calidad', 'pendiente',  '2026-06-20', '2026-07-15'),
    ('OP-2026-007', 'Tapa Registro Acero 60x60cm',       800, 100.0, 'Línea A - Corte y Troquelado', 'completada', '2026-06-01', '2026-06-18'),
    ('OP-2026-008', 'Base Máquina Industrial BM-400',     15, 55.00, 'Línea B - Ensamblaje',         'en_proceso', '2026-06-14', '2026-07-02')
  `);

  // ─── PROYECTOS ────────────────────────────────────────────────────────────
  console.log('📋 Insertando proyectos...');
  await q.query(`
    INSERT INTO proyectos (nombre, cliente, responsable, progreso, fecha_limite, estado) VALUES
    ('Automatización Línea A',           'Minera del Norte Ltda.',        'Fernando Araya Castro',  72.0, '2026-08-31', 'activo'),
    ('ERP Módulo Contabilidad Avanzada', 'Interno',                       'Sebastián Vidal Reyes',  45.0, '2026-09-30', 'activo'),
    ('Expansión Bodega Norte',           'Constructora Vial S.A.',        'Ana Sepúlveda Muñoz',    88.0, '2026-07-15', 'activo'),
    ('Certificación ISO 9001',           'Interno',                       'Juan Carrasco Vega',     60.0, '2026-10-31', 'activo'),
    ('Portal Clientes Online',           'Distribuidora Centra S.A.',     'Sebastián Vidal Reyes',  35.0, '2026-11-30', 'en_riesgo'),
    ('Rediseño Planta Producción',       'Fábrica Textiles Norte SpA',    'Fernando Araya Castro',  20.0, '2026-12-31', 'activo'),
    ('Migración Sistema Contable',       'Interno',                       'María Rojas Pérez',      95.0, '2026-06-30', 'en_riesgo'),
    ('Capacitación Fuerza de Ventas',    'Interno',                       'Claudia Herrera Díaz',   100.0,'2026-06-15', 'completado')
  `);

  // ─── TAREAS PROYECTO ──────────────────────────────────────────────────────
  console.log('✅ Insertando tareas de proyectos...');
  await q.query(`
    INSERT INTO tareas_proyecto (proyecto_id, descripcion, asignado_a, fecha_vencimiento, prioridad, estado) VALUES
    (1, 'Relevamiento de procesos actuales línea A',        'Fernando Araya Castro',  '2026-06-25', 'alta',  'completada'),
    (1, 'Diseño sistema control PLC Siemens S7-1200',       'Sebastián Vidal Reyes',  '2026-07-15', 'alta',  'en_proceso'),
    (1, 'Adquisición sensores y actuadores',                'Ana Sepúlveda Muñoz',    '2026-07-20', 'media', 'pendiente'),
    (2, 'Análisis requerimientos módulo contable',          'María Rojas Pérez',      '2026-06-30', 'alta',  'completada'),
    (2, 'Desarrollo reportes financieros automáticos',      'Maximiliano Vera Ortiz', '2026-07-31', 'alta',  'en_proceso'),
    (3, 'Planos arquitectura bodega norte',                 'Ana Sepúlveda Muñoz',    '2026-06-28', 'alta',  'completada'),
    (3, 'Gestión permisos municipales',                     'Juan Carrasco Vega',     '2026-07-05', 'alta',  'en_proceso'),
    (4, 'Diagnóstico gap ISO 9001',                         'Claudia Herrera Díaz',   '2026-07-15', 'media', 'completada'),
    (4, 'Documentación procedimientos operativos',          'Cristóbal Mena Torres',  '2026-08-31', 'media', 'en_proceso'),
    (5, 'Diseño UX/UI portal clientes',                    'Maximiliano Vera Ortiz', '2026-07-31', 'alta',  'en_proceso'),
    (5, 'Desarrollo backend API REST portal',               'Gonzalo Ibáñez Riquelme','2026-09-30', 'alta',  'pendiente'),
    (6, 'Levantamiento plano actual planta',                'Fernando Araya Castro',  '2026-07-31', 'baja',  'en_proceso'),
    (7, 'Migración datos históricos 5 años',               'Rodrigo Pinto Vargas',   '2026-06-25', 'alta',  'en_proceso'),
    (7, 'Validación cuadratura contable',                   'María Rojas Pérez',      '2026-06-28', 'alta',  'pendiente'),
    (8, 'Taller técnicas de venta consultiva',              'Roberto Fuentes Lagos',  '2026-06-10', 'media', 'completada')
  `);

  // ─── HORAS PROYECTO ───────────────────────────────────────────────────────
  console.log('⏱️  Insertando horas de proyectos...');
  const horasDescs = ['Reunión planificación','Desarrollo','Testing','Documentación','Revisión cliente','Análisis'];
  const horasValues: string[] = [];
  const proyIds = [1,1,2,2,3,4,5,5,6,7,7,8];
  const horasUsers = ['Fernando Araya Castro','Sebastián Vidal Reyes','María Rojas Pérez','Maximiliano Vera Ortiz',
                      'Ana Sepúlveda Muñoz','Claudia Herrera Díaz','Gonzalo Ibáñez Riquelme','Roberto Fuentes Lagos'];
  for (let i = 0; i < 24; i++) {
    const pid = proyIds[i % proyIds.length];
    const usr = horasUsers[i % horasUsers.length];
    const hrs = [2,4,6,8,3,5,7,1.5,2.5,4.5,6.5,3.5][i % 12];
    const d = new Date('2026-06-01');
    d.setDate(d.getDate() + (i % 20));
    const fecha = d.toISOString().split('T')[0];
    const desc = horasDescs[i % horasDescs.length];
    horasValues.push(`(${pid}, '${usr}', ${hrs}, '${fecha}', '${desc}')`);
  }
  await q.query(`INSERT INTO horas_proyecto (proyecto_id, usuario, horas, fecha, descripcion) VALUES ${horasValues.join(',')}`);

  // ─── REPORTES ─────────────────────────────────────────────────────────────
  console.log('📊 Insertando reportes...');
  await q.query(`
    INSERT INTO reportes (nombre, modulo, tipo, ultima_ejecucion, estado, programado, programacion_cron) VALUES
    ('Ventas Mensuales por Vendedor',     'Ventas',        'Excel',  NOW() - INTERVAL '2 hours',  'activo', true,  '0 8 1 * *'),
    ('Estado de Inventario Crítico',      'Inventario',    'PDF',    NOW() - INTERVAL '1 hour',   'activo', true,  '0 7 * * 1-5'),
    ('Flujo de Caja Semanal',             'Finanzas',      'Excel',  NOW() - INTERVAL '3 hours',  'activo', true,  '0 9 * * 1'),
    ('Cuentas por Cobrar Vencidas',       'Contabilidad',  'PDF',    NOW() - INTERVAL '30 min',   'activo', true,  '0 8 * * 1-5'),
    ('Nómina de Empleados Activos',       'RRHH',          'Excel',  NOW() - INTERVAL '5 hours',  'activo', false, NULL),
    ('Avance de Proyectos',               'Proyectos',     'PDF',    NOW() - INTERVAL '1 day',    'activo', true,  '0 7 * * 5'),
    ('Producción Diaria por Línea',       'Producción',    'PDF',    NOW() - INTERVAL '12 hours', 'activo', true,  '0 18 * * 1-5'),
    ('Compras por Proveedor Trimestral',  'Compras',       'Excel',  NOW() - INTERVAL '2 days',   'activo', false, NULL)
  `);

  // ─── LOGS AUDITORÍA ───────────────────────────────────────────────────────
  console.log('🔍 Insertando logs de auditoría...');
  const acciones = ['LOGIN','LOGOUT','CREATE','UPDATE','DELETE','EXPORT','PRINT','VIEW'];
  const modulos = ['Auth','Ventas','Compras','Inventario','Clientes','Finanzas','Contabilidad','RRHH','Producción','Proyectos'];
  const resultados = ['exitoso','exitoso','exitoso','fallido','exitoso','exitoso'];
  const ips = ['192.168.1.100','192.168.1.101','192.168.1.102','10.0.0.50','172.16.0.10'];
  const logValues: string[] = [];
  const logUsuarios = ['admin','jcarrasco','mrojas','pmorales','cgonzalez'];
  for (let i = 0; i < 30; i++) {
    const usr = logUsuarios[i % logUsuarios.length];
    const acc = acciones[i % acciones.length];
    const mod = modulos[i % modulos.length];
    const ip = ips[i % ips.length];
    const res = resultados[i % resultados.length];
    const det = `${acc} en módulo ${mod} por usuario ${usr}`;
    logValues.push(`('${usr}', '${acc}', '${mod}', '${ip}', '${res}', '${det}')`);
  }
  await q.query(`INSERT INTO logs_auditoria (usuario, accion, modulo, ip, resultado, detalle) VALUES ${logValues.join(',')}`);

  // ─── ALERTAS DE SEGURIDAD ─────────────────────────────────────────────────
  console.log('🚨 Insertando alertas de seguridad...');
  await q.query(`
    INSERT INTO alertas_seguridad (tipo, descripcion, severidad, resuelta) VALUES
    ('Múltiples intentos fallidos',  '5 intentos fallidos de login usuario admin desde IP 201.45.123.88',  'ALTA',  false),
    ('Acceso fuera de horario',      'Acceso al módulo de Finanzas desde IP externa a las 02:34 AM',       'MEDIA', false),
    ('Exportación masiva',           'Usuario mrojas exportó +5000 registros del módulo Clientes',         'MEDIA', true),
    ('IP no reconocida',             'Login exitoso desde nueva IP 190.162.45.22 para usuario jcarrasco',  'BAJA',  true),
    ('Cambio permisos crítico',      'Modificación de rol usuario cgonzalez de bodeguero a admin',         'ALTA',  false)
  `);

  // ─── CONFIGURACIÓN GENERAL ────────────────────────────────────────────────
  console.log('⚙️  Insertando configuración general...');
  await q.query(`
    INSERT INTO configuracion_general (empresa, rut, moneda, zona_horaria, formato_fecha, idioma, tema) VALUES
    ('Industrias Metálicas del Sur S.A.', '76.543.210-9', 'CLP', 'America/Santiago', 'DD/MM/YYYY', 'es', 'light')
  `);

  // ─── INTEGRACIONES ────────────────────────────────────────────────────────
  console.log('🔌 Insertando integraciones...');
  await q.query(`
    INSERT INTO integraciones (nombre, ultimo_sync, estado, activa, config_json) VALUES
    ('Transbank WebPay Plus',    NOW() - INTERVAL '2 hours',  'activo',   true,  '{"commerce_code":"597055555532","terminal_id":"T001"}'),
    ('Gmail SMTP',               NOW() - INTERVAL '30 min',   'activo',   true,  '{"host":"smtp.gmail.com","port":587,"user":"erp@empresa.cl"}'),
    ('EDI Supermercados',        NOW() - INTERVAL '1 day',    'activo',   true,  '{"endpoint":"https://edi.proveedor.cl/api","version":"2.1"}'),
    ('SAP Business One',         NOW() - INTERVAL '5 hours',  'activo',   true,  '{"server":"sap.empresa.cl","company":"EMPRESA_PRD"}'),
    ('SII Chile (DTE)',          NOW() - INTERVAL '15 min',   'activo',   true,  '{"rut_empresa":"76543210-9","ambiente":"produccion"}'),
    ('WhatsApp Business API',    NOW() - INTERVAL '2 days',   'inactivo', false, '{"phone_id":"","access_token":""}')
  `);

  // ─── NOTIFICACIONES ───────────────────────────────────────────────────────
  console.log('🔔 Insertando configuración de notificaciones...');
  await q.query(`
    INSERT INTO configuracion_notificaciones (tipo, descripcion, activa) VALUES
    ('nueva_orden_venta',       'Notificar al crear nueva orden de venta',            true),
    ('stock_critico',           'Alertar cuando un producto baje del stock mínimo',   true),
    ('factura_vencida',         'Recordatorio 3 días antes del vencimiento',          true),
    ('nuevo_empleado',          'Notificar al incorporar nuevo colaborador',          false),
    ('backup_completado',       'Confirmar cuando el backup nocturno finalice',       true),
    ('alerta_seguridad',        'Notificar inmediatamente ante alertas de seguridad', true)
  `);

  console.log('\n✅ ¡Seed completado con éxito!');
  console.log('📊 Resumen:');
  console.log('   • 5 usuarios | 7 departamentos | 20 empleados');
  console.log('   • 20 clientes | 8 vendedores | 30 órdenes de venta');
  console.log('   • 15 proveedores | 20 órdenes de compra');
  console.log('   • 30 productos | 40 movimientos inventario');
  console.log('   • 4 cuentas bancarias | 35 movimientos financieros');
  console.log('   • 25 facturas | 20 asientos contables');
  console.log('   • 4 líneas producción | 8 órdenes producción');
  console.log('   • 8 proyectos | 15 tareas | 24 registros de horas');
  console.log('   • 8 reportes | 30 logs auditoría | 5 alertas seguridad');
  console.log('   • Configuración general + 6 integraciones + 6 notificaciones');

  await AppDataSource.destroy();
}

seed().catch(err => {
  console.error('❌ Error en seed:', err);
  process.exit(1);
});
