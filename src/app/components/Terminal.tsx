import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';

interface CommandOutput {
  command: string;
  output: string[];
  isError?: boolean;
}

const COMMANDS: Record<string, { description: string; handler: () => string[] }> = {
  help: {
    description: 'List all available commands',
    handler: () => [
      'Available commands:',
      '',
      '  help        Show this help message',
      '  whoami      Display identity info',
      '  skills      List technical skills',
      '  experience  Show work history',
      '  contact     Display contact info',
      '  ls          List available files',
      '  cat <file>  Read file contents',
      '  clear       Clear terminal',
      '',
      'Type a command and press Enter',
    ],
  },
  whoami: {
    description: 'Display identity info',
    handler: () => [
      '',
      '        ██████╗ ███████╗██████╗ ██╗   ██╗',
      '        ╚════██╗╚══███╔╝██╔══██╗██║   ██║',
      '         █████╔╝  ███╔╝ ██████╔╝██║   ██║',
      '         ╚═══██╗ ███╔╝  ██╔══██╗╚██╗ ██╔╝',
      '        ██████╔╝███████╗██║  ██║ ╚████╔╝ ',
      '        ╚═════╝ ╚══════╝╚═╝  ╚═╝  ╚═══╝  ',
      '',
      '  ┌─────────────────────────────────────┐',
      '  │  MOHAMED SAYED                      │',
      '  │  Senior Software Engineer           │',
      '  │  Cairo, Egypt                       │',
      '  └─────────────────────────────────────┘',
      '',
      '  Azariah (עֲזַרְיָה) — helped by God',
      '  Building with purpose, shipping with conviction.',
      '',
    ],
  },
  skills: {
    description: 'List technical skills',
    handler: () => [
      '// Technical Skills',
      '',
      'Languages:    Node.js, TypeScript, Go, .NET, PHP',
      'Databases:    PostgreSQL, MongoDB, Redis, SQL Server',
      'Cloud:        GCP, AWS, Azure',
      'DevOps:       Kubernetes, Docker, OpenShift, CI/CD',
      'Architecture: DDD, Microservices, Event-Driven',
      'Leadership:   Team scaling, Technical mentorship',
    ],
  },
  experience: {
    description: 'Show work history',
    handler: () => [
      '// Work Experience',
      '',
      '► SENIOR SOFTWARE ENGINEER @ Yassir',
      '  Oct 2024 - Jan 2026',
      '  API response: 800ms → 270ms',
      '',
      '► SOFTWARE ENGINEER @ Thndr',
      '  Apr 2024 - Oct 2024',
      '',
      '► STAFF SOFTWARE ENGINEER @ Kashier',
      '  2022 - 2024',
      '  Scaled: 3 → 19 engineers',
      '',
      '► FULL STACK @ Earlier roles',
      '  2016 - 2021',
    ],
  },
  contact: {
    description: 'Display contact info',
    handler: () => [
      '// Contact Information',
      '',
      'Email:    k@3zrv.com',
      'GitHub:   github.com/3zrv',
      'LinkedIn: linkedin.com/in/3zrv',
      '',
      'Status: Available for select projects',
    ],
  },
  ls: {
    description: 'List available files',
    handler: () => ['drwxr-xr-x  resume.txt', 'drwxr-xr-x  stack.txt', '-rw-r--r--  secret.txt'],
  },
  clear: {
    description: 'Clear terminal',
    handler: () => [],
  },
};

const FILE_CONTENTS: Record<string, string[]> = {
  'resume.txt': [
    '╔══════════════════════════════════╗',
    '║     MOHAMED SAYED - RESUME       ║',
    '╚══════════════════════════════════╝',
    '',
    '8+ years of software engineering',
    'Specialized in backend systems',
    'and infrastructure at scale.',
    '',
    'Download: 3zrv.com/resume.pdf',
  ],
  'stack.txt': [
    '// Current Tech Stack',
    '',
    'const stack = {',
    '  runtime: "Node.js",',
    '  language: "TypeScript",',
    '  cloud: "GCP + Kubernetes",',
    '  database: "PostgreSQL",',
    '  philosophy: "Ship fast, iterate"',
    '};',
  ],
  'secret.txt': ['Permission denied: Nice try ;)'],
};

export function Terminal() {
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: '',
      output: [
        '┌────────────────────────────────┐',
        '│  3ZRV Terminal v1.0.0          │',
        '│  Type "help" for commands      │',
        '└────────────────────────────────┘',
        '',
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const [command, ...args] = trimmedCmd.split(' ');

    if (!trimmedCmd) return;

    setCommandHistory((prev) => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    if (command === 'clear') {
      setHistory([]);
      return;
    }

    if (command === 'cat') {
      const filename = args[0];
      if (!filename) {
        setHistory((prev) => [
          ...prev,
          { command: cmd, output: ['Usage: cat <filename>'], isError: true },
        ]);
        return;
      }
      const content = FILE_CONTENTS[filename];
      if (content) {
        setHistory((prev) => [...prev, { command: cmd, output: content }]);
      } else {
        setHistory((prev) => [
          ...prev,
          { command: cmd, output: [`cat: ${filename}: No such file`], isError: true },
        ]);
      }
      return;
    }

    const cmdHandler = COMMANDS[command];
    if (cmdHandler) {
      setHistory((prev) => [...prev, { command: cmd, output: cmdHandler.handler() }]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: [`Command not found: ${command}`, 'Type "help" for available commands'],
          isError: true,
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <motion.div
      className="bg-black border border-gray-800 rounded-lg overflow-hidden font-mono text-sm h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-900/50 border-b border-gray-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-gray-500 text-xs ml-2">3zrv@portfolio ~ </span>
      </div>

      {/* Terminal content */}
      <div
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto min-h-[300px] max-h-[400px] cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, i) => (
          <div key={i} className="mb-2">
            {entry.command && (
              <div className="flex items-center gap-2">
                <span className="text-red-600">❯</span>
                <span className="text-gray-300">{entry.command}</span>
              </div>
            )}
            {entry.output.map((line, j) => (
              <div key={j} className={`ml-4 ${entry.isError ? 'text-red-400' : 'text-gray-400'}`}>
                {line || '\u00A0'}
              </div>
            ))}
          </div>
        ))}

        {/* Input line */}
        <div className="flex items-center gap-2">
          <span className="text-red-600">❯</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-gray-300 outline-none caret-red-600"
            autoFocus
            spellCheck={false}
          />
          <motion.span
            className="w-2 h-5 bg-red-600"
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
