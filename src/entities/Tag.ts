import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Post } from "./Post";

@Entity()
export class Tag extends BaseEntity {
  @Column({ type: "text" })
  name: string;

  @ManyToMany(() => Post, (post) => post.tags)
  @JoinTable()
  posts: Post[];
}
