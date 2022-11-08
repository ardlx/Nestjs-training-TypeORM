import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'products'})
export class Product {
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique: true})
    prodId: string

    @Column()
    name: string

    @Column({nullable: true})
    description: string

    @Column()
    price: number

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date


}