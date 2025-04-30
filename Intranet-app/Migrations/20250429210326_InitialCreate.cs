using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Intranet_app.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ramens",
                columns: table => new
                {
                    RamenID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BrandName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    RamenName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    RamenDescription = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ramens", x => x.RamenID);
                });

            migrationBuilder.CreateTable(
                name: "Recipes",
                columns: table => new
                {
                    RecipeID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RecipeName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    RecipeInstruction = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipes", x => x.RecipeID);
                });

            migrationBuilder.CreateTable(
                name: "Toppings",
                columns: table => new
                {
                    ToppingID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ToppingName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    Weight = table.Column<decimal>(type: "numeric", nullable: false),
                    ToppingDescription = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Toppings", x => x.ToppingID);
                });

            migrationBuilder.CreateTable(
                name: "RamenRecipe",
                columns: table => new
                {
                    RamensRamenID = table.Column<int>(type: "integer", nullable: false),
                    RecipesRecipeID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RamenRecipe", x => new { x.RamensRamenID, x.RecipesRecipeID });
                    table.ForeignKey(
                        name: "FK_RamenRecipe_Ramens_RamensRamenID",
                        column: x => x.RamensRamenID,
                        principalTable: "Ramens",
                        principalColumn: "RamenID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RamenRecipe_Recipes_RecipesRecipeID",
                        column: x => x.RecipesRecipeID,
                        principalTable: "Recipes",
                        principalColumn: "RecipeID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RamenTopping",
                columns: table => new
                {
                    RamensRamenID = table.Column<int>(type: "integer", nullable: false),
                    ToppingsToppingID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RamenTopping", x => new { x.RamensRamenID, x.ToppingsToppingID });
                    table.ForeignKey(
                        name: "FK_RamenTopping_Ramens_RamensRamenID",
                        column: x => x.RamensRamenID,
                        principalTable: "Ramens",
                        principalColumn: "RamenID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RamenTopping_Toppings_ToppingsToppingID",
                        column: x => x.ToppingsToppingID,
                        principalTable: "Toppings",
                        principalColumn: "ToppingID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RecipeTopping",
                columns: table => new
                {
                    RecipesRecipeID = table.Column<int>(type: "integer", nullable: false),
                    ToppingsToppingID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeTopping", x => new { x.RecipesRecipeID, x.ToppingsToppingID });
                    table.ForeignKey(
                        name: "FK_RecipeTopping_Recipes_RecipesRecipeID",
                        column: x => x.RecipesRecipeID,
                        principalTable: "Recipes",
                        principalColumn: "RecipeID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RecipeTopping_Toppings_ToppingsToppingID",
                        column: x => x.ToppingsToppingID,
                        principalTable: "Toppings",
                        principalColumn: "ToppingID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RamenRecipe_RecipesRecipeID",
                table: "RamenRecipe",
                column: "RecipesRecipeID");

            migrationBuilder.CreateIndex(
                name: "IX_RamenTopping_ToppingsToppingID",
                table: "RamenTopping",
                column: "ToppingsToppingID");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeTopping_ToppingsToppingID",
                table: "RecipeTopping",
                column: "ToppingsToppingID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RamenRecipe");

            migrationBuilder.DropTable(
                name: "RamenTopping");

            migrationBuilder.DropTable(
                name: "RecipeTopping");

            migrationBuilder.DropTable(
                name: "Ramens");

            migrationBuilder.DropTable(
                name: "Recipes");

            migrationBuilder.DropTable(
                name: "Toppings");
        }
    }
}
