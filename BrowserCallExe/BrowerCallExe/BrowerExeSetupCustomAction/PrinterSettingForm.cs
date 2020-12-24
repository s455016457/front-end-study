using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Printing;
using System.IO;
using System.Windows.Forms;

namespace BrowerExeSetupCustomAction
{
    public partial class PrinterSettingForm : Form
    {
        private ErrorProvider errorProvider = new ErrorProvider();
        public PrinterSettingForm()
        {
            InitializeComponent();
            printerListBox.Items.AddRange(LocalPrinter.GetLocalPrinters().ToArray());
            printerListBox.SelectedItem = LocalPrinter.DefaultPrinter();
            label2.Text = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);
        }

        private void btnCancel_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("确认取消安装吗？", "取消安装", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
            {
                DialogResult = DialogResult.Cancel;
            }
        }

        private void btnOK_Click(object sender, EventArgs e)
        {
            errorProvider.Clear();

            if (printerListBox.SelectedItem==null)
            {
                errorProvider.SetError(printerListBox, "请选择打印机!");
                return;
            }

            var defaultPrint = printerListBox.SelectedItem.ToString();

            var appDataFloderPath = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);

            DirectoryInfo directory = new DirectoryInfo(Path.Combine(appDataFloderPath, "BrowerExe"));
            if (!directory.Exists) directory.Create();
            File.AppendAllText(Path.Combine(directory.FullName, "setting.json"), defaultPrint);

            if (TestPrint())
            {
                DialogResult = System.Windows.Forms.DialogResult.OK;
            }
        }
        public bool TestPrint()
        {
            using (var pd = new PrintDocument())
            {
                try
                {
                    // 设置打印机
                    pd.PrinterSettings.PrinterName = printerListBox.SelectedItem.ToString();
                    // 设置纸张尺寸100mm*60mm
                    pd.DefaultPageSettings.PaperSize = new PaperSize()
                    {
                        PaperName = "100*60",
                        /**
                         * 1英寸=25.4毫米
                         * 1毫米=0.04英寸
                         * */
                        Width = (int)(100 * 100 / 25.4),
                        Height = (int)(60 * 100 / 25.4),
                    };

                    pd.DocumentName = "标签打印";
                    pd.PrintPage += Pd_PrintPage;

                    pd.Print();
                    return true;
                }
                catch (Exception ex)
                {
                    MessageBox.Show("默认打印机打印测试失败! \n\r 详情:" + ex.Message, "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return false;
                }
            }
        }

        private void Pd_PrintPage(object sender, PrintPageEventArgs e)
        {
            e.Graphics.PageUnit = GraphicsUnit.Millimeter;

            Font titleFont = new Font("黑体", 11, FontStyle.Bold);//标题字体
            Font fntTxt = new Font("宋体", 10, FontStyle.Regular);//正文文字
            Font fntTxt1 = new Font("宋体", 8, FontStyle.Regular);//正文文字
            Brush brush = new SolidBrush(Color.Black);//画刷

            e.Graphics.DrawString("打印测试", titleFont, brush, new PointF(32, 2));
            e.Graphics.DrawString($"纸张大小【{ e.PageSettings.PaperSize.PaperName}】", fntTxt, brush, new PointF(30, 22));
        }
    }

    class LocalPrinter
    {
        private static PrintDocument fPrintDocument = new PrintDocument();
        //获取本机默认打印机名称
        public static String DefaultPrinter()
        {
            return fPrintDocument.PrinterSettings.PrinterName;
        }
        public static List<String> GetLocalPrinters()
        {
            List<String> fPrinters = new List<String>();
            fPrinters.Add(DefaultPrinter()); //默认打印机始终出现在列表的第一项
            foreach (String fPrinterName in PrinterSettings.InstalledPrinters)
            {
                if (!fPrinters.Contains(fPrinterName))
                {
                    fPrinters.Add(fPrinterName);
                }
            }
            return fPrinters;
        }
    }
}
