import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "layout",
	templateUrl: "./layout.component.html",
	styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
	constructor(private router: Router) {}

	navigateTo(route: string) {
		this.router.navigate([route]);
	}

	ngOnInit(): void {}
}
