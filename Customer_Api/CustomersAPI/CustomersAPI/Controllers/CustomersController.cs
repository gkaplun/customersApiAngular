using CustomersAPI.Data;
using CustomersAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CustomersAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly CustomersDbContext _customersDbContext;

        public CustomersController(CustomersDbContext customersDbContext)
        {
            _customersDbContext = customersDbContext;
        }


        [HttpGet]
        public async Task<ActionResult> GetAllCustomers()
        {
            var customers = await _customersDbContext.Customers.ToListAsync();

            return Ok(customers);
        }

        [HttpGet]
        [Route("{ id: Guid}")]
        public async Task<IActionResult> GetCustomerById([FromRoute] Guid id)
        {
            var customer = await _customersDbContext.Customers.FirstOrDefaultAsync(x => x.Id == id);

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        [HttpPost]
        public async Task<IActionResult> AddCustomer([FromBody] Customer customerModel)
        {
            customerModel.Id = Guid.NewGuid();

            await _customersDbContext.Customers.AddAsync(customerModel);
            await _customersDbContext.SaveChangesAsync();

            return Ok(customerModel);
        }



        [HttpPut]
        [Route("{ id: Guid}")]
        public async Task<IActionResult> UpdateCustomer([FromRoute] Guid id, Customer UpdatedCustomerModel)
        {
            var customer = await _customersDbContext.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            customer.FirstName = UpdatedCustomerModel.FirstName;
            customer.LastName = UpdatedCustomerModel.LastName;
            customer.EmailAddress = UpdatedCustomerModel.EmailAddress;
            customer.CreatedDateTime = UpdatedCustomerModel.CreatedDateTime;
            customer.UpdatedDateTime = UpdatedCustomerModel.UpdatedDateTime;

            await _customersDbContext.SaveChangesAsync();

            return Ok(customer);

        }

        [HttpDelete]
        [Route("{ id: Guid}")]
        public async Task<IActionResult> DeleteCustomerById([FromRoute] Guid id)
        {
            var customer = await _customersDbContext.Customers.FirstOrDefaultAsync(x => x.Id == id);

            if (customer == null)
            {
                return NotFound();
            }

            _customersDbContext.Customers.Remove(customer);
            await _customersDbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
