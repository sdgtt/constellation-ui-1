// remove-prefix.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removePrefix'
})
export class RemovePrefixPipe implements PipeTransform {
  transform(value: string): string {
    const prefix = ':HW_tests/HW_test_multiconfig:';
    return value.replace(prefix, ': ').trim();
  }
}