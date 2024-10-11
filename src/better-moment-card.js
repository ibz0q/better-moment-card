import { DateTime } from "./luxon.min.js";
class BetterMomentCard extends HTMLElement {
	set hass(hass) {
		this.createTime()
	}
	createTime() {
		if (!this.content) {
			this.innerHTML = `<ha-card><div class="card-content" ${this.config.parentStyle ? 'style="' + this.config.parentStyle + ';"' : ""}></div></ha-card>`;
			this.content = this.querySelector("div");
			var config = this.config, elm = [];
			if (config.moment !== null && config.moment[0]) {
				Object.keys(config.moment).forEach(k => {
					elm[k] = document.createElement('div');
					elm[k].setAttribute("id", "moment-" + k);
					config.moment[k].parentStyle ? elm[k].style.cssText = config.moment[k].parentStyle : null;
					this.content.appendChild(elm[k]);
				});
				let timeMatrix = (f = "HH:mm:ss", tz, loc, locs) => {
					locs = (typeof locs === 'string') ? (JSON.parse(locs) || 0) : locs;
					let dt = DateTime.now(); if (tz) dt = dt.setZone(tz); if (loc) dt = dt.setLocale(loc);
					return locs ? dt.toLocaleString(locs) : dt.toFormat(f);
				};
				let updateDom = () => {
					Object.keys(config.moment).forEach(k => {
						if (config.moment[k].templateRaw) {
							var html = config.moment[k].templateRaw.replace(/{{moment\s+format=(.*?)\s*(?:timezone=(.*?))?\s*(?:locale=(.*?))?\s*(?:localeSetting=(.*?))?}}/g, (m, f, tz, loc, locs) => (timeMatrix(f, tz || 0, loc || 0, locs)));
						} else {
							let time = timeMatrix(config.moment[k].format, config.moment[k].timezone || 0, config.moment[k].locale || 0, config.moment[k].localeString || 0);
							var html = config.moment[k].template ? (config.moment[k].template).replace(/{{moment}}/g, time) : time
						}
						elm[k].innerHTML = html
					})
				};
				updateDom();
				setInterval(updateDom, (config.interval ? config.interval : 1000));
			}
		}
	}
	setConfig(config) {
		this.config = config;
		if (this.content) {
			delete this.content;
			this.createTime()
		}
	}
	getCardSize() {
		return 2;
	}
	getLayoutOptions() {
		return { grid_rows: 3, grid_columns: 4, grid_min_rows: 3, grid_max_rows: 3 };
	}
	static getStubConfig() {
		return { "type": "custom:better-moment-card", "parentStyle": "line-height:normal;\n", "moment": [{ "parentStyle": "font-size:4em;  text-align:center; font-weight:400;\n", "templateRaw": "{{moment format=HH:mm:ss}}\n" }, { "parentStyle": "font-size:1.9em; text-align:center; margin-top:5px;\n", "templateRaw": "{{moment format=cccc, dd LLLL}}\n" }] }
	}
}
customElements.define('better-moment-card', BetterMomentCard);
window.customCards = window.customCards || [];
window.customCards.push({ type: "better-moment-card", name: "Better Moment Card", preview: true, documentationURL: "https://github.com/ibz0q/better-moment-card" });