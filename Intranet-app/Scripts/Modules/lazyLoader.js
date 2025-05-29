
import Fetch from "./fetch.js";

export default function LazyLoader(container, config, itemCreator) {
    const totalPages = config.totalPages;
    const fetch = new Fetch(config.url);
    const params = () => {
        return {
            ...config.urlParams,
            recordsByPage: config.records,
            pageNumber: config.page++,
        }
    }

    const observer = new IntersectionObserver((entries, self) => {
        entries.forEach(async entry => {
            if (entry.isIntersecting) {
                const loading = document.createElement("div");
                loading.className = "o-loader";
                container.appendChild(loading);
                const result = await fetch.params(params()).execute();
                loading.remove();
                for (let item of result.loansMapped) {
                    const element = itemCreator(item);
                    container.appendChild(element);
                }
                if (config.page < totalPages)
                    observer.observe(container.lastElementChild);
                self.unobserve(entry.target);

                updateLoansCountDescription();
            }
        });
    }, { rootMargin: "0px 0px 500px", threshold: 0.05 });
    observer.observe(container.lastElementChild);
}

export function LazyLoaderAPE(container, source, records, itemCreator) {
    let pageNumber = 1;
    const totalPages = Math.ceil(source.length / records);

    container.innerHTML = '';
    const limit = records < source.length ? records : source.length;
    for (let i = 0; i < limit; i++) {
        const element = itemCreator(source[i]);
        container.appendChild(element);
    }

    if (source.length == 0)
        return;

    const observer = new IntersectionObserver((entires, self) => {
        entries.forEach(async entry => {
            if (entry.isIntersecting) {
                const skip = pageNumber++ * records;
                const result = source.slice(skip, skip + records);
                for (let item of result) {
                    const element = itemCreator(item);
                    container.appendChild(element);
                }
                if (pageNumber < totalPages)
                    observer.observe(entry.target);
                self.unobserve(entry.target);
            }
        });
    }, { rootMargin: "0px 0px 500px", threshold: 0.05 });

    observer.observe(container.lastElementChild);
}