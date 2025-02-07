import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: String

    @Column({type: "varchar", length:200})
    name: String

    @Column({type: "varchar", length:100})
    email: String

    @Column({type: "varchar", length:100})
    password: String

    @Column({type: "varchar", length:10})
    mobile: String

    @Column({type: "varchar", length:10})
    gender: String

    @Column({type: "timestamptz"})
    date_of_birth: Date
}