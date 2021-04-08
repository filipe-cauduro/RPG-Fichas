import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: 0, name: "tokenversion" })
    tokenVersion: number;

    @Column({ default: 0, name: "refreshtokenversion" })
    refreshTokenVersion: number;

    constructor(name: string, email: string, password: string, id?: number) {
        Object.assign(this, { name, email, password, id });
    }
}