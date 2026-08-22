import { Project, Experience, Skill } from './types';

export interface FAQItem {
  question: string;
  answer: string;
}

const getProjectImages = (folderName: string): string[] => [
  `/images/${folderName}/1.jpg`, `/images/${folderName}/2.jpg`,
  `/images/${folderName}/3.jpg`, `/images/${folderName}/4.jpg`,
  `/images/${folderName}/5.jpg`, `/images/${folderName}/6.jpg`,
  `/images/${folderName}/7.jpg`, `/images/${folderName}/8.jpg`,
  `/images/${folderName}/9.jpg`, `/images/${folderName}/10.jpg`,
];

const getProjectVideos = (folderName: string): string[] => [
  `/videos/${folderName}/1.mp4`, `/videos/${folderName}/2.mp4`,
  `/videos/${folderName}/3.mp4`, `/videos/${folderName}/4.mp4`,
  `/videos/${folderName}/5.mp4`, `/videos/${folderName}/6.mp4`,
  `/videos/${folderName}/7.mp4`, `/videos/${folderName}/8.mp4`,
  `/videos/${folderName}/9.mp4`, `/videos/${folderName}/10.mp4`,
];

export const PROJECTS: Project[] = [
  {
    id: 'industrial-power-meter',
    title: 'Industrial Power Meter for High-Voltage Measurement',
    category: 'Embedded Systems & Measurement',
    description: 'Designed and developed the hardware of an industrial power meter for three-phase systems, measuring phase-to-phase voltages up to 690 V and currents from 6 mA to 6 A. The STM32-based system features RS-485 (Modbus RTU) and Ethernet (Modbus TCP/IP) interfaces for industrial monitoring and communication.',
    technologies: ['STM32', 'Voltage Measurement', 'ADC', 'RS-485', 'TCP/IP', 'PCB Design'],
    images: getProjectImages('adk400'),
    localVideos: getProjectVideos('adk400'),
    challenges: [
      'Designed a voltage-sensing interface for measurements up to 650 V while providing a suitable signal level for the MCU ADC.',
      'Integrated measurement, processing, and industrial communication interfaces in one embedded platform.',
      'Validated the measurement chain and electronic board for reliable industrial operation.'
    ],
    outcome: 'Developed an embedded power measurement platform combining high-voltage sensing, STM32 processing, and industrial communication.',
    results: [
      'Voltage scaling for measurements up to 650 V phase-to-phase.',
      'STM32-based acquisition and processing.',
      'RS-485 and TCP/IP communication.',
      'Industrial PCB architecture.'
    ],
    lessons: [
      'High-voltage measurement requires careful attention to isolation, creepage, clearance, and signal scaling.',
      'The complete measurement chain should be validated from the input to the ADC and communication layer.'
    ]
  },
  {
    id: 'soft-starter-rs485',
    title: 'Industrial Soft Starter with Integrated RS-485 Communication',
    category: 'Power Electronics & Embedded Systems',
    description:     'Designed and developed the hardware of a soft starter system for AC induction motors, focusing on industrial applications. The design utilizes thyristor-based phase-angle control to gradually ramp up motor voltage, reducing inrush current and mechanical stress. The hardware is built around an STM32 microcontroller and includes an LCD-based interface, protection circuits, and RS-485 communication for system integration. Designed with EMC considerations for integration into industrial automation panels, with applications including pumps, conveyors, and compressors.',
    technologies: ['Thyristor Control', 'STM32', 'RS-485', 'Embedded Systems', 'PCB Design','Power Electronics', 'Industrial Electronics'],
    images: getProjectImages('softstarter'),
    localVideos: getProjectVideos('softstarter'),
    challenges: [
    'Designed the power-electronics hardware around thyristor-based phase-angle control.',
    'Integrated RS-485 communication while considering electrical isolation, signal integrity, and EMC.',
    'Tested and validated the electronic board under industrial operating conditions.'
    ],
    outcome:   'Developed the electronic hardware for an industrial soft starter using thyristor phase-angle control, with RS-485 communication and a touchscreen HMI for monitoring and control.',
    results: [
      'RS-485 communication for control and system integration.',
      'Worked with thyristor-based phase-angle control electronics.',
      'Supported electronic board validation and product development.'
    ],
    lessons: [
      'Power electronics and embedded control require careful isolation and EMC considerations.',
      'Industrial communication improves diagnostics and system integration.'
    ]
  },
  {
    id: 'industrial-io-modbus-ppoe',
    title: 'Industrial I/O Device with Modbus TCP/IP and 4PPoE',
    category: 'Industrial Automation & Networking',
    description: 'Designed and developed the hardware   of an I/O device capable of reading sensor data via the I²C bus and transmitting it to a PLC using the Modbus TCP/IP protocol. The design consolidates multiple I/O devices into a single Ethernet port, reducing costs associated with expansion modules and sensor power cabling',
    technologies: ['STM32', 'Modbus TCP/IP', '4PPoE', 'Ethernet', 'Industrial I/O', 'PCB Design'],
    images: getProjectImages('io-device'),
    localVideos: getProjectVideos('io-device'),
    challenges: [
      'Combined industrial I/O, Ethernet communication, and PoE power delivery in one embedded device.',
      'Designed the PCB architecture for reliable communication and power distribution.',
      'Considered distributed and ring-topology industrial network integration.'
    ],
    outcome: 'Developed an embedded industrial I/O platform for networked automation and distributed field-device applications.',
    results: [
      'Modbus TCP/IP communication.',
      '4PPoE power delivery.',
      'Embedded industrial I/O architecture.',
      'Designed for industrial network integration.'
    ],
    lessons: [
      'Industrial Ethernet hardware requires simultaneous attention to power integrity, communication quality, and EMC.',
      'Network topology should be considered at both hardware and system levels.'
    ]
  },
   {
    id: 'rtd8-io-module',
    title: 'RTD8 – 8-Channel RTD I/O Module with RS-485',
    category: 'Industrial Electronics',
    description: 'Designed and developed the hardware of an industrial multi-point temperature monitoring module supporting 8 independent RTD channels with PT100 sensors in 2-, 3-, and 4-wire configurations, covering a measurement range of –200°C to +850°C. The module integrates an LCD TFT touchscreen, RS-485 Modbus RTU, and four dedicated relay outputs for trip, alarm, fan, and fault functions, making it suitable for critical applications such as motor winding protection',
    technologies: ['PT100', 'STM32', 'RS-485', 'PCB Design', 'KiCad', 'Industrial I/O'],
    images: getProjectImages('rtd8'),
    localVideos: getProjectVideos('rtd8'),
    challenges: [
      'Designed multiple analog RTD input channels while maintaining reliable measurement and signal integrity.',
      'Integrated digital communication and relay outputs into an industrial electronic board.',
      'Prepared the design for manufacturing and validated the assembled hardware.'
    ],
    outcome: 'Developed an industrial RTD I/O architecture for reliable multi-channel temperature acquisition and communication with control systems.',
    results: ['8 RTD input channels.', 'RS-485 communication.', '4 relay outputs.', 'Manufacturing BOM and Gerber documentation.'],
    lessons: [
      'Industrial I/O design requires careful separation of analog, digital, and power sections.',
      'Design-for-manufacturing should be considered from the beginning of PCB development.'
    ]
  },
  {
    id: 'stm32h7-hmi-development-board',
    title: 'STM32H7 Embedded HMI Development Board',
    category: 'Embedded Hardware & HMI',
    description: 'Designed a 4-layer development board based on the STM32H7B0VBT6 microcontroller for advanced embedded and HMI applications. The board integrates display interfaces (LTDC) with touchscreen support, 64 MB external PSRAM via QSPI, Wi-Fi/Bluetooth connectivity, USB-C power input, and a boost converter providing up to 35 V for LCD backlight power. ',
    technologies: ['STM32H7B0VBT6', 'LTDC', 'QSPI PSRAM', 'USB-C', 'Touchscreen', '4-Layer PCB', 'MIPI DSI' , 'MIPI DPI', 'KiCad'],
    images: getProjectImages('stm32h7'),
    localVideos: getProjectVideos('stm32h7'),
    challenges: [
      'Designed a high-density 4-layer PCB while maintaining signal integrity and reducing EMI.',
      'Integrated display, touchscreen, external memory, USB-C, wireless connectivity, and power-management functions.',
      'Provided flexible display connectivity including RGB-based interfaces and bridge-based MIPI DSI integration.'
    ],
    outcome: 'Designed a versatile STM32H7 development platform for advanced embedded HMI and display applications.',
    results: [
      '4-layer GND/Signal/Signal/GND PCB stack-up.',
      '64 MB PSRAM through QSPI.',
      'STM32H7 LTDC display and touchscreen support.',
      'USB-C and dedicated backlight boost converter.'
    ],
    lessons: [
      'High-speed embedded hardware benefits from a carefully planned PCB stack-up and controlled routing.',
      'Display systems require coordination between MCU peripherals, memory, power, and physical interfaces.'
    ]
  },
  {
  id: 'Multi-Display HMI Device with Touchscreen',
  title: 'Multi-Display HMI Device with Touchscreen',
  category: 'Embedded Systems & Industrial Electronics',

  description:
    'Designed and developed a versatile HMI display card supporting multiple display interfaces, including LCD, MIPI DPI (RGB), and MIPI DSI. Integrated touchscreen support for flexible user interaction, with compatibility across a wide range of cost-effective display technologies for embedded and industrial applications.',

  technologies: [
    'STM32',
    'HMI',
    'Touchscreen',
    'MIPI DPI/DSI',
    'LCD',
    'KiCad'
  ],

  images: getProjectImages('hmi'),
  localVideos: getProjectVideos('hmi'),
  youtubeVideos: ['y0rCJS2UjuY'],
  challenges: [
    'Designed a display interface supporting LCD, MIPI DPI (RGB), and MIPI DSI.',
    'Integrated a capacitive touchscreen for intuitive user interaction.',
    'Designed the hardware with compatibility, reliability, and cost optimization in mind.'
  ],

  outcome:
    'Developed a flexible HMI display platform providing multiple display options and touchscreen interaction for embedded and industrial applications.',

  results: [
    'Support for LCD, MIPI DPI, and MIPI DSI displays.',
    'Integrated capacitive touchscreen interface.',
    'Designed for industrial and embedded HMI applications.'
  ],

  lessons: [
    'Display interface design requires careful consideration of compatibility and signal integrity.',
    'Hardware flexibility can significantly improve HMI system integration.',
    'Cost, availability, and performance must be balanced during hardware design.'
  ], 
},
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'Cevie Group, Algiers',
    role: 'Electronics and Embedded Systems Engineer',
    period: '2024 – Present',
    description: [
      'Design and develop electronic boards for embedded and industrial applications.',
      'Integrate, program, and validate microcontrollers, including STM32-based systems.',
      'Perform incoming quality control, validation tests, diagnostics, and debugging of electronic boards.',
      'Responsible for production, testing, troubleshooting, and validation of 500+ PCBA units across different electronic products.',
      'Generate BOM and Gerber files for PCB manufacturing.',
      'Support procurement, supplier negotiations, and cost reduction activities.',
      'Optimize stock management and monitor component supplies.',
      'Resolve technical issues and propose design and production-process improvements.',
      'Analyze electronic boards and schematics and support reverse-engineering activities.',
      'Optimize SMT production processes for embedded-system assembly.'
    ]
  },
  {
    company: 'Bomare Company, Algiers',
    role: 'Technical Engineer – Technical Documentation',
    period: '2023 – 2024',
    description: [
      'Developed product specifications and reviewed technical documentation for compliance.',
      'Validated the functionality of electronic boards.',
      'Proposed product and process improvements based on technical analysis.',
      'Studied electronic boards and schematics and contributed to technology monitoring.',
      'Prepared preliminary packing lists and BOMs for SKD/CKD activities.',
      'Participated in internal and external technical meetings.'
    ]
  },
  {
    company: 'Cevie Group, Algiers',
    role: 'Embedded Systems Engineer Intern',
    period: '2022 – 2023',
    description: [
      'Worked on a multi-channel RTD PT100 temperature detection system.',
      'Contributed to a 4-layer PCB with EMC considerations and an HMI for real-time data acquisition.',
      'Generated BOM and Gerber files for PCB manufacturing.',
      'Tested and validated RTD PT100 and HMI systems.',
      'Selected electronic components according to technical specifications and cost constraints.'
    ]
  }
];

export const SKILLS: Skill[] = [
  { name: 'Multi-Layer PCB Design',  category: 'Hardware' },
  { name: 'EMC Directive Compliance',  category: 'Hardware' },
  { name: 'STM32 ',  category: 'Embedded Systems' },
  { name: 'C / C++',  category: 'Software' },
  { name: 'PLC Programming', category: 'PLC/SCADA' },
  { name: 'Modbus TCP/IP & RS-485',    category: 'Industrial Communication' },
  { name: 'KiCad',  category: 'Software' },
  { name: 'STM32CubeMX / STM32CubeIDE',  category: 'Software' },
  { name: 'MATLAB',  category: 'Software' },
  { name: 'Zelio Soft / Ladder',  category: 'PLC/SCADA' },
  { name: 'Reverse Engineering',  category: 'Hardware' },
  { name: 'Procurement & BOM Management',  category: 'Electrical Design' }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'What are your core technical strengths?',
    answer: 'My main strengths are electronic hardware design, multi-layer PCB development, embedded systems, microcontroller programming, industrial communication, board validation, EMC-oriented design, and technical problem solving.'
  },
  {
    question: 'What kind of electronic systems have you worked on?',
    answer: 'My projects include multi-channel PT100 temperature acquisition, industrial RTD I/O modules, soft starter electronics, Modbus TCP/IP and PoE industrial I/O, high-voltage power measurement, and STM32H7-based HMI hardware.'
  },
  {
    question: 'Which communication protocols and interfaces do you use?',
    answer: 'I have experience with RS-485, Modbus TCP/IP, SPI, I²C, and UART, as well as Ethernet-based industrial communication.'
  },
  {
    question: 'What is your educational background?',
    answer: 'I hold a Master’s degree in Electronics of Embedded Systems from Université Saad Dahlab Blida 1, following a Bachelor’s degree in Electronics from the same university.'
  }
];
