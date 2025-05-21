import { Monday } from './examples/monday';
import { Tuesday } from './examples/tuestday';

(async () => {
    try {
        // Monday()
        Tuesday()

        console.log('All operations completed successfully');
    } catch (error) {
        console.error('Error executing database operations:', error);
    }
})();