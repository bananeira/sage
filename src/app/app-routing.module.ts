import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MathjaxModule} from "mathjax-angular";

const routes: Routes = [];

@NgModule({
    imports: [RouterModule.forRoot(routes),
        MathjaxModule.forRoot(
            {
                "config": {
                    "loader": {
                        "load": ["input/tex-full", "output/svg", "[tex]/require", "[tex]/ams"]
                    },
                    "tex": {
                        "inlineMath": [["$", "$"]],
                        "packages": [
                            "base",
                            "require",
                            "ams",
                        ],
                    },
                    "svg": { "fontCache": "global" },
                },
                "src": "https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/startup.js"
            }
        )],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
