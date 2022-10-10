import { MigrationInterface, QueryRunner } from "typeorm";

export class Tag1665392759723 implements MigrationInterface {
    name = 'Tag1665392759723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag_posts_post" ("tagId" integer NOT NULL, "postId" integer NOT NULL, CONSTRAINT "PK_3f7aba2d3af1f3576095f7666ce" PRIMARY KEY ("tagId", "postId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6c2f3fa276343c3a11f5520cbe" ON "tag_posts_post" ("tagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c43864658728381c39e8df1803" ON "tag_posts_post" ("postId") `);
        await queryRunner.query(`ALTER TABLE "tag_posts_post" ADD CONSTRAINT "FK_6c2f3fa276343c3a11f5520cbe2" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tag_posts_post" ADD CONSTRAINT "FK_c43864658728381c39e8df18032" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag_posts_post" DROP CONSTRAINT "FK_c43864658728381c39e8df18032"`);
        await queryRunner.query(`ALTER TABLE "tag_posts_post" DROP CONSTRAINT "FK_6c2f3fa276343c3a11f5520cbe2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c43864658728381c39e8df1803"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6c2f3fa276343c3a11f5520cbe"`);
        await queryRunner.query(`DROP TABLE "tag_posts_post"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}
