import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./graphql";

export const schema = makeSchema({
  types,
  outputs: {
  // nexusに.graphql拡張子にスキーマファイルを出力させる
  schema: join(process.cwd(), "schema.graphql"),
  // type definition
  typegen: join(process.cwd(), "nexus-typegen.ts"),
}})
