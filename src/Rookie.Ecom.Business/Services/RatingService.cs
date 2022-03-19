using AutoMapper;
using Rookie.Ecom.Business.Interfaces;
using Rookie.Ecom.Contracts.Dtos;
using Rookie.Ecom.DataAccessor.Entities;
using Rookie.Ecom.DataAccessor.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.Business.Services
{
    public class RatingService : IRatingService
    {
        private readonly IBaseRepository<Rating> _baseRepository;
        private readonly IMapper _mapper;

        public RatingService(IBaseRepository<Rating> baseRepository, IMapper mapper)
        {
            _baseRepository = baseRepository;
            _mapper = mapper;
        }
        public async Task<RatingDto> AddAsync(CreateRatingDto createRatingDto)
        {
            var rating = _mapper.Map<Rating>(createRatingDto);
            var item = await _baseRepository.AddAsync(rating);
            return _mapper.Map<RatingDto>(item);
        }
    }
}
