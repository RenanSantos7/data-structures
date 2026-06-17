import fs from 'node:fs'

export function input(question?: string): string {
  if (question) process.stdout.write(question)

  const buffer = Buffer.alloc(1025)
  const bytesRead = fs.readSync(0, buffer, 0, buffer.length, null)

  return buffer.toString('utf8', 0, bytesRead).trim()
}

export function inputNumber(question?: string): number {
  return Number(input(question))
}
