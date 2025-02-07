import { Module } from "@nestjs/common";
import { DbConnection } from "./db.Source";

@Module({
    providers:[...DbConnection],
    exports: [...DbConnection],
})

export class DbModule{}