using System.Collections.Generic;

namespace Rookie.Ecom.Contracts
{
    public class PagedResponseModel<TModel> : BasePagedResponseModel
    {
        public IEnumerable<TModel> Items { get; set; }
    }
}