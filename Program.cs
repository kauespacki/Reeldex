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

app.MapPut("/filmes/{id}", async (int id, Filme updatedFilme, AppDbContext db) =>
{
    var existing = await db.TabelaFilmes.FindAsync(id);
    if (existing == null)
        return Results.NotFound("Filme não encontrado!");

    existing.Titulo = updatedFilme.Titulo;
    existing.Ano = updatedFilme.Ano;
    existing.Genero = updatedFilme.Genero;
    existing.Sinopse = updatedFilme.Sinopse;

    await db.SaveChangesAsync();
    return Results.Ok(existing);
});


app.MapPost("/filmes", async (Filme filme, AppDbContext db) =>
{
    db.TabelaFilmes.Add(filme);
    await db.SaveChangesAsync();
    return Results.Created($"/filmes/{filme.Id}", filme);
});

app.MapDelete("/filmes/{id}", async (int id, AppDbContext db) =>
{
    var filme = await db.TabelaFilmes.FindAsync(id);
    if (filme == null)
        return Results.NotFound("Filme não encontrado!");
    
    db.TabelaFilmes.Remove(filme);
    await db.SaveChangesAsync();
    return Results.Ok("Filme deletado com sucesso!");
});

app.Run();
