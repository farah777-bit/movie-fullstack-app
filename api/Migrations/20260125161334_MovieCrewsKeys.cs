using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class MovieCrewsKeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieCrews",
                table: "MovieCrews");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "MovieCrews",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieCrews",
                table: "MovieCrews",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2",
                column: "ConcurrencyStamp",
                value: "b2");

            migrationBuilder.CreateIndex(
                name: "IX_MovieCrews_MovieId",
                table: "MovieCrews",
                column: "MovieId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieCrews",
                table: "MovieCrews");

            migrationBuilder.DropIndex(
                name: "IX_MovieCrews_MovieId",
                table: "MovieCrews");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "MovieCrews");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieCrews",
                table: "MovieCrews",
                columns: new[] { "MovieId", "PersonId" });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2",
                column: "ConcurrencyStamp",
                value: " b2");
        }
    }
}
