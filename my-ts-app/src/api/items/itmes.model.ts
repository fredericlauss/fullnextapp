import * as z from 'zod';

const Item = z.object({
    name: z.string().min(1),
});

type Item = z.infer<typeof Item>;

export default Item;