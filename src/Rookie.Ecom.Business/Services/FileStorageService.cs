using Microsoft.AspNetCore.Http;
using Rookie.Ecom.Business.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Rookie.Ecom.Business.Services
{
    public class FileStorageService : IFileStorageService
    {
        private readonly string _rootFolder;
        private const string IMAGES_FOLDER_NAME = "images";

        public FileStorageService()
        {
            var slnPath = Directory.GetParent(System.IO.Directory.GetCurrentDirectory()).ToString();
            _rootFolder = Path.Combine(slnPath, "Rookie.Ecom.Customer", "wwwroot");
        }

        public string GetFileUrl(string fileName)
        {
            return $"/{IMAGES_FOLDER_NAME}/{fileName}";
        }

        public async Task SaveFileAsync(Stream mediaBinaryStream, string fileName)
        {
            var filePath = Path.Combine(_rootFolder, IMAGES_FOLDER_NAME, fileName);
            using var output = new FileStream(filePath, FileMode.Create);
            await mediaBinaryStream.CopyToAsync(output);
        }

        public async Task DeleteFileAsync(string fileName)
        {
            string fileNameAfterTrimStart = string.Empty;
            fileNameAfterTrimStart = fileName.TrimStart('/');
            var filePath = Path.Combine(_rootFolder, fileNameAfterTrimStart);
            if (File.Exists(filePath))
            {
                await Task.Run(() => File.Delete(filePath));
            }
            return;
        }
        public async Task<string> SaveFile(IFormFile file)
        {
            var originalFileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(originalFileName)}";
            await SaveFileAsync(file.OpenReadStream(), fileName);
            return "/" + IMAGES_FOLDER_NAME + "/" + fileName;
        }
    }
}
