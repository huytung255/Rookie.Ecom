using Rookie.Ecom.Contracts.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.Business.Interfaces
{
    public interface IRatingService
    {
        Task<RatingDto> AddAsync(CreateRatingDto createRatingDto);
    }
}
