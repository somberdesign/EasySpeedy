using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EasySpeedyMortgages.Startup))]
namespace EasySpeedyMortgages
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
