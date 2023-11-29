import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { INftModel } from './nft.model'

@Entity('nfts')
export class Nft implements INftModel {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        nullable: false,
    })
    address: string

    @Column({
        type: 'numeric',
        nullable: false,
    })
    token_id: number

    @Column({
        type: 'numeric',
        nullable: false,
    })
    expire: number

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
