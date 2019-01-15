/*
 Copyright 2013-2019 the original author or authors from the JHipster project.

 This file is part of the JHipster project, see https://www.jhipster.tech/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import { Input, Directive, ElementRef, OnChanges } from '@angular/core';
import { JhiConfigService } from '../config.service';
import { TranslateService } from '@ngx-translate/core';

/**
 * A wrapper directive on top of the translate pipe as the inbuilt translate directive from ngx-translate is too verbose and buggy
 */
/* tslint:disable */
@Directive({
    selector: '[jhiTranslate]'
})
export class JhiTranslateComponent implements OnChanges {
    @Input() jhiTranslate: string;
    @Input() translateValues: any;

    constructor(
        private configService: JhiConfigService,
        private el: ElementRef,
        private translateService: TranslateService
    ) {}

    ngOnChanges() {
        const enabled = this.configService.getConfig().i18nEnabled;
        if (enabled) {
            this.translateService
                .get(this.jhiTranslate, this.translateValues)
                .subscribe(
                    value => {
                        this.el.nativeElement.innerHTML = value;
                    },
                    () => {
                        return `${
                            this.configService.getConfig().noi18nMessage
                        }[${this.jhiTranslate}]`;
                    }
                );
        }
    }
}
/* tslint:enable */
