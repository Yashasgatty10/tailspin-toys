/**
 * Publisher lookup helpers for static Astro pages.
 * These functions query the seeded game catalog and return summary data that is
 * used to render publisher listings and filters during build-time generation.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Fetches every publisher from the catalog in alphabetical order by name.
 *
 * @param db - The database instance used to query publisher records.
 * @returns A list of publisher summaries ordered by `name` ascending.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row): Publisher => ({
        id: row.id,
        name: row.name,
    }));
}
