﻿using Signum.Engine.Scheduler;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

namespace Signum.React.Scheduler
{
    public static class SystemEventServer
    {
        public static void Start(IApplicationBuilder app, IApplicationLifetime lifetime)
        {
            SystemEventLogLogic.Log("Application Start");

            lifetime.ApplicationStopping.Register(() =>
            {
                SystemEventLogLogic.Log("Application Stop");
            });
        }
    }
}