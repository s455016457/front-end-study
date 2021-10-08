using System;
using System.IO;

namespace BrowerExe
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");

            var appDataFloderPath = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);

            Console.WriteLine($"appDataFloderPath:{appDataFloderPath}");

            FileInfo fileInfo = new FileInfo(Path.Combine(appDataFloderPath, "BrowerExe", "setting.json"));
            if (fileInfo.Exists)
            { 
                using(StreamReader stream = new StreamReader(fileInfo.FullName))
                {
                    Console.WriteLine($"默认打印机：{  stream.ReadToEnd()}");
                }
            }

            if (args != null)
            {
                foreach (var value in args)
                {
                    Console.WriteLine(value);
                }
            }
            Console.WriteLine("输入回车退出");
            Console.ReadLine();
        }
    }
}
