using Microsoft.EntityFrameworkCore;
using Reeldex;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=filmes.db"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.MapGet("/filmes", (AppDbContext db) =>
{
    var filmes = db.TabelaFilmes.ToList();
    return Results.Ok(filmes);
});

app.MapGet("/filmes/{id}", async (AppDbContext db, int id) =>
{
    var filme = await db.TabelaFilmes.FindAsync(id);
    return filme is not null ? Results.Ok(filme) : Results.NotFound("Filme não encontrado.");
});


app.Run();
