import { Monday } from './examples/monday';
import { Tuesday } from './examples/tuestday';
import { Wednesday } from './examples/wednesday';
import { thursday } from './examples/thursday';

(async () => {
    try {
        // Monday()
        // Tuesday()
        // Wednesday();
        thursday()

        console.log('All operations completed successfully');
    } catch (error) {
        console.error('Error executing database operations:', error);
    }
})();