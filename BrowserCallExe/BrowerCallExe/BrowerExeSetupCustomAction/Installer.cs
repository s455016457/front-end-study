using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration.Install;
using System.Linq;
using System.Threading.Tasks;

namespace BrowerExeSetupCustomAction
{
    [RunInstaller(true)]
    public partial class Installer : System.Configuration.Install.Installer
    {
        public Installer()
        {
            InitializeComponent();
        }

        public override void Install(IDictionary stateSaver)
        {
            InstallDatabase();
            base.Install(stateSaver);
        }

        private bool InstallDatabase()
        {
           PrinterSettingForm configForm = new PrinterSettingForm();
            System.Windows.Forms.DialogResult result = configForm.ShowDialog();
            if (result == System.Windows.Forms.DialogResult.Cancel)
            {
                throw new Exception("取消安装！");
            }

            if (result != System.Windows.Forms.DialogResult.OK)
            {
                throw new Exception("配置错误！");
            }

            return true;
        }
    }
}
