import dayjs from "./dayjs.min.js";
class BetterMomentCard extends HTMLElement {
	set hass(hass) {
		this.createTime()
	}
	createTime() {
		if (!this.content) {
			this.innerHTML = `<ha-card><div class="card-content" ${this.config.parentStyle ? 'style="' + this.config.parentStyle + '"' : "style='padding: 2.5em 0'"}></div></ha-card>`;
			this.content = this.querySelector("div");
			var config = this.config, elm = [];
			if (config.moment !== null && config.moment[0]) {
				Object.keys(this.config.moment).forEach(k => {
					elm[k] = document.createElement('div');
					elm[k].setAttribute("id", "moment-" + k);
					this.config.moment[k].style ? elm[k].style.cssText = this.config.moment[k].style : null;
					this.content.appendChild(elm[k]);
				});
				let updateDom = () => {
					Object.keys(config.moment).forEach(k => {
						var time = dayjs().format(config.moment[k].format ? config.moment[k].format : "HH:mm:ss")
						elm[k].innerHTML = config.moment[k].template ? (config.moment[k].template).replace(/{{moment}}/g, time) : time
					})
				};
				updateDom();
				clearInterval(window.__global_minterval);
				window.__global_minterval = setInterval(updateDom, 1000);
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
}
customElements.define('better-moment-card', BetterMomentCard);