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
                        "load": ["input/tex-full", "output/chtml", 'ui/menu', "[tex]/require", "[tex]/ams"]
                    },
                    "ignoreHtmlClass": 'tex2jax_ignore',
                    "processHtmlClass": 'tex2jax_process',
                    "tex": {
                        "inlineMath": [["$", "$"]],
                        "packages": [
                            "base",
                            "require",
                            "ams",
                        ],
                    },
                    "svg": { "fontCache": "global", "mtextInheritFont": "false", "merrorInheritFont": "false"}
                },
                "src": "https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/startup.js"
            }
        )],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
