import { BinaryLike, CipherKey, createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'

export class CipherHelper {
    private static algorithm = 'aes-256-ctr'
    private static encoding: BufferEncoding = 'hex'

    static async getKey(password: BinaryLike, salt?: BinaryLike): Promise<Buffer> {
        return (await promisify(scrypt)(password, salt || 'salt', 32)) as Buffer
    }

    static encrypt(key: CipherKey, text: string): string {
        const iv = randomBytes(16)
        const cipher = createCipheriv(this.algorithm, key, iv)

        return Buffer.concat([iv, cipher.update(text), cipher.final()]).toString(this.encoding)
    }

    static decrypt(key: CipherKey, encrypted: string): string {
        const data = Buffer.from(encrypted, this.encoding)
        const decipher = createDecipheriv(this.algorithm, key, data.slice(0, 16))

        return Buffer.concat([decipher.update(data.slice(16)), decipher.final()]).toString()
    }
}
