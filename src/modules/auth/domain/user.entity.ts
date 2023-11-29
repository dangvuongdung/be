import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'
import { IUserModel } from './user.model'

@Entity('users')
export class User implements IUserModel {
    @PrimaryGeneratedColumn()
    id: number

    @Index('idx_user_address', { unique: true })
    @Column({
        type: 'varchar',
        nullable: false,
    })
    address: string

    @Column({
        name: 'created_at',
        type: 'timestamp',
        precision: null,
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_at?: Date

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        precision: null,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updated_at?: Date
}
