import { Monday } from './examples/monday';
import { Thursday } from './examples/thursday';
import { Tuesday } from './examples/tuestday';
import { Wednesday } from './examples/wednesday';

(async () => {
    try {
        // Monday()
        // Tuesday()
        // Wednesday();
        Thursday()

        console.log('All operations completed successfully');
    } catch (error) {
        console.error('Error executing database operations:', error);
    }
})();