import { DateTime } from "./luxon.min.js";
class BetterMomentCard extends HTMLElement {
	set hass(hass) {
        this.hass_obj = hass;
		this.createTime()
	}
	createTime() {
		if (!this.content) {
			this.innerHTML = `<ha-card><div class="card-content" ${this.config.parentStyle ? 'style="' + this.config.parentStyle + ';"' : ""}></div>${this.config.parentHTML ? '' + this.config.parentHTML + '' : ""}</ha-card>`;
			this.content = this.querySelector("div");
			var config = this.config, elm = [];
			if (config.moment !== null && config.moment[0]) {
				Object.keys(config.moment).forEach(k => {
					elm[k] = document.createElement('div');
					elm[k].setAttribute("id", "moment-" + k);
					config.moment[k].parentStyle ? elm[k].style.cssText = config.moment[k].parentStyle : null;
					this.content.appendChild(elm[k]);
				});
				let dtMatrix = (f = "HH:mm:ss", tz, loc, locs) => {
					let dt = DateTime.now();
					locs = (typeof locs === 'string') ? (JSON.parse(locs) || false) : locs;
					if (tz) {
						if (tz.startsWith("useEntity")) {
							const match = tz.match(/useEntity\[(.*?)\]/)?.[1].split('.');
							let entity = this.hass_obj.states[`${match[0]}.${match[1]}`];
							tz = entity ? match.slice(2).reduce((acc, key) => acc?.[key], entity) : tz;
						}
						dt = dt.setZone(tz === "useHass" ? this.hass_obj.config.time_zone : tz);
					}
					if (loc) dt = dt.setLocale(loc);
					return locs ? dt.toLocaleString(locs) : dt.toFormat(f);
				};
				let updateDom = () => {
					Object.keys(config.moment).forEach(k => {
						if (config.moment[k].templateRaw) {
							var html = config.moment[k].templateRaw.replace(/{{moment\s+format=(.*?)\s*(?:timezone=(.*?))?\s*(?:locale=(.*?))?\s*(?:localeSetting=(.*?))?}}/g, (m, f, tz, loc, locs) => (dtMatrix(f, tz || false, loc || false, locs)));
						} else {
							let dt = dtMatrix(config.moment[k].format, config.moment[k].timezone || false, config.moment[k].locale || false, config.moment[k].localeString || false);
							var html = config.moment[k].template ? (config.moment[k].template).replace(/{{moment}}/g, dt) : dt
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
	static getStubConfig() {
		return { "type": "custom:better-moment-card", "parentStyle": "line-height:normal;\n", "moment": [{ "parentStyle": "font-size:4em;  text-align:center; font-weight:400;\n", "templateRaw": "{{moment format=HH:mm:ss}}\n" }, { "parentStyle": "font-size:1.9em; text-align:center; margin-top:5px;\n", "templateRaw": "{{moment format=cccc, dd LLLL}}\n" }] }
	}
}
customElements.define('better-moment-card', BetterMomentCard);
window.customCards = window.customCards || [];
window.customCards.push({ type: "better-moment-card", name: "Better Moment Card", preview: true, documentationURL: "https://github.com/ibz0q/better-moment-card" });