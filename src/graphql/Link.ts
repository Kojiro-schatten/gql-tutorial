// objectType: 新しい型を作るために使用
import { extendType, nonNull, stringArg, objectType } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

export const Link = objectType({
  name: "Link",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("description");
    t.nonNull.string("urll");
  }
});

let links: NexusGenObjects["Link"][] = [
  {
    id: 1,
    urll: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
  {
    id: 2,
    urll: "graphql.org",
    description: "GraphQL official website",
  },
];

export const LinkQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("feed", {
      type: "Link",
      resolve(parent, args, context, info) {
        return links;
      },
    })
  }
});

export const LinkMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field("post", {
      type: "Link",
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      resolve(parent, args, context) {
        const { description, url } = args;
        let idCount = links.length + 1;
        const link = {
          id: idCount,
          description: description,
          urll: url,
        };
        links.push(link);
        return link;
      }
    })
  }
})