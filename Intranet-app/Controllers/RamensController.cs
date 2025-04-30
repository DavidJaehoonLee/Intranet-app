using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Intranet_app.Models;

namespace Intranet_app
{
    [Route("api/[controller]")]
    [ApiController]
    public class RamensController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RamensController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Ramens
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ramen>>> GetRamens()
        {
            return await _context.Ramens.ToListAsync();
        }

        // GET: api/Ramens/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ramen>> GetRamen(int id)
        {
            var ramen = await _context.Ramens.FindAsync(id);

            if (ramen == null)
            {
                return NotFound();
            }

            return ramen;
        }

        // PUT: api/Ramens/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRamen(int id, Ramen ramen)
        {
            if (id != ramen.RamenID)
            {
                return BadRequest();
            }

            _context.Entry(ramen).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RamenExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Ramens
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Ramen>> PostRamen(Ramen ramen)
        {
            _context.Ramens.Add(ramen);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRamen", new { id = ramen.RamenID }, ramen);
        }

        // DELETE: api/Ramens/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRamen(int id)
        {
            var ramen = await _context.Ramens.FindAsync(id);
            if (ramen == null)
            {
                return NotFound();
            }

            _context.Ramens.Remove(ramen);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RamenExists(int id)
        {
            return _context.Ramens.Any(e => e.RamenID == id);
        }
    }
}
