import { Column, Entity, Index, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Comment } from "./Comment";
import { Post } from "./Post";

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Index()
  @Column({ length: 256, unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
