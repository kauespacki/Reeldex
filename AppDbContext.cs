using Microsoft.EntityFrameworkCore;

namespace Reeldex
{
    public class AppDbContext : DbContext
    {
        // Construtor padrão utilizado pelo ASP.NET via injeção de dependência
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Representa a tabela Filme no banco
        public DbSet<Filme> TabelaFilmes => Set<Filme>();
    }
}