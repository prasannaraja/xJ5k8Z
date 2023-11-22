import { Component, OnInit } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";

@Component({
	selector: "providers",
	templateUrl: "./providers.component.html",
	styleUrls: ["./providers.component.scss"],
})
export class ProvidersComponent implements OnInit {
	providers = new UntypedFormControl(["Play'n GO"]);
	providerList: string[] = [
		"Yggdrasil",
		"iSoftBet",
		"Playson",
		"Pragmatic Play",
		"Play'n GO",
	];

	constructor() {}

	ngOnInit(): void {}
}
