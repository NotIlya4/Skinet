﻿using Api.Controllers.Attributes;
using Domain.Primitives;
using Infrastructure.Services.ProductService;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.ProductsControllers;

[Tags("Products")]
public class DeleteProductsController : ProductsControllerBase
{
    public DeleteProductsController(IProductService productService) : base(productService)
    {
    }
    
    [HttpDelete]
    [Route("name/{name}")]
    [ProducesProductNotFound]
    [ProducesNoContent]
    public async Task<IActionResult> DeleteProductById(string name)
    {
        await ProductService.DeleteProductByName(new Name(name));
        return NoContent();
    }
}