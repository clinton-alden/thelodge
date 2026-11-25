# The Lodge — Website Maintenance Guide

The Lodge is a student-led University of Washington community connecting environmental science, law, and policy through field trips, campus events, and shared outdoor experiences. All UW students are welcome.

This guide is intended for future club officers, including those with no coding experience. Most routine updates require editing only one small data file or uploading images. The site uses GitHub Pages and Jekyll; no separate hosting service or database is required.

## Important links

- Website: https://clinton-alden.github.io/thelodge/
- Repository: https://github.com/clinton-alden/thelodge
- Instagram: https://www.instagram.com/thelodge.uw/ (@thelodge.uw)
- Listserv: https://mailman23.u.washington.edu/mailman/listinfo/thelodge
- Website contact email: thelodge@uw.edu

## 1. Getting started in GitHub

You need write access to the repository. Ask a repository administrator for access if you cannot edit or upload files. Open the repository and select the `main` branch. To edit a text file, open it and click the pencil icon. Make the change, click **Commit changes**, provide a descriptive message, and commit to `main` if permitted. If the branch is protected, create a branch and submit a pull request instead.

GitHub Pages automatically rebuilds the site when changes are committed to its configured publishing branch. Check the **Actions** tab for the Pages build and deployment status. A successful build may take several minutes to become visible. On a Mac, use Cmd+Shift+R in Chrome to refresh without cached files. No manual republishing is normally needed.

## 2. Adding an upcoming event

Both the Home and Events pages use the same calendar data in `script.js`. Do not edit the HTML calendar manually.

Open `script.js` and find the `const events = [...]` block near the top. Initially it is empty except for a comment. To add an event, replace only that block, keeping the rest of the JavaScript unchanged.

Example (fictional events; replace these details before publishing):

```javascript
const events = [
    {
        date: '2027-01-16',
        title: 'Winter Forest Walk',
        description: '10 AM. Bring rain gear and lunch. Registration details will be announced through our listserv.',
        location: 'Location to be announced'
    },
    {
        date: '2027-02-20',
        title: 'Coastal Ecology Field Trip',
        description: 'Explore marine ecology and resource management.',
        location: 'Washington Coast'
    }
];
```

- Use `YYYY-MM-DD` dates, including leading zeros. Dates are interpreted as calendar dates, not UTC timestamps.
- Each event has `date`, `title`, `description`, and `location`. Include meeting time, RSVP instructions, and other logistical information in `description`. There is no separate time or registration field.
- Keep existing events when adding another. Separate objects with commas. Use double quotes for a text value if it includes an apostrophe, or escape the apostrophe in single-quoted text.
- The description is plain text, not HTML; pasted URLs are not automatically clickable.
- Save and commit. The relevant date is highlighted and the event appears in that month's list on both calendars. Select Prev/Next to browse other months.
- To edit an event, change its values. To cancel or remove it, remove its object and fix surrounding commas. An empty calendar uses `const events = [];`.

The calendar does not automatically remove past dates or transfer events into the archive. You may keep historical calendar entries or remove them after an event. Archive completed events separately as described below.

## 3. Archiving a completed event

Open `_data/past_events.yml`. The leading underscore in `_data` is required. This is a YAML list, not JavaScript. Each entry represents a past event.

Append a new entry below the existing entries, with a blank line between them. Example only:

```yaml
- id: "2027-01-16-winter-forest-walk"
  title: "Winter Forest Walk"
  date: "2027-01-16"
  location: "Western Washington"
  description: "Students explored forest ecology and management."
```

- `id`: a unique folder name. Use lowercase letters, numbers, and hyphens; avoid spaces. Including the date helps distinguish repeat events.
- `title`: the public event title.
- `date`: use quoted `YYYY-MM-DD` format.
- `location`: the public location.
- `description`: optional historical notes for the data file. The current event cards do not display recaps or descriptions.

Keep the indentation shown: a dash at the start of each entry and two spaces before each following field. Use straight quotes, not smart quotes. Do not leave a standalone `[]` in the file when adding entries (it represents an empty list). Do not repeat IDs. If a value contains double quotes, escape them or use YAML single quotes with doubled internal apostrophes.

The archive sorts by date automatically, newest first. An entry with no images still appears with a placeholder. To edit an entry, change the text in this file. Avoid changing an ID unless you also rename its matching folder. To remove an event, remove its entire YAML entry; delete its image folder contents too if they should no longer be publicly accessible. Removing an entry alone does not delete its images.

## 4. Creating an event image folder

For the example ID above, the folder must be `assets/events/2027-01-16-winter-forest-walk/`.

If the GitHub upload picker does not accept folders:

1. Return to the repository root on `main`.
2. Select **Add file → Create new file**.
3. Enter `assets/events/2027-01-16-winter-forest-walk/.gitkeep` as the full filename. Slashes create the nested folder structure.
4. Enter `Event photos` as its content and commit.
5. Open the new event folder, select **Add file → Upload files**, and upload the images.
6. Commit. The `.gitkeep` placeholder is ignored by the gallery and may remain.

Alternatively, dragging a folder from Finder into GitHub's upload area may preserve its structure. Always verify where files landed before committing. Do not upload ZIP archives as a substitute for the actual images.

## 5. Posters and photographs

Put the original promotional poster in the event's folder with the filename `00-poster.png` or `00-poster.jpg`. The image must really be in that format; changing the extension alone does not convert it. `poster.png` and `poster.jpg` also work, but use only one poster per event. If your poster is a PDF, export it to PNG or JPEG first (on a Mac, Preview → File → Export).

Name actual event photographs `01.jpg`, `02.jpg`, `03.jpg`, and so on. The gallery sorts filenames alphabetically, so use leading zeros. Supported image extensions are JPG, JPEG, PNG, WebP, AVIF, and GIF (case-insensitive). HEIC and PDF are not supported by this gallery. Convert those formats before upload. Keep photos directly inside the matching event folder; no additional subfolders are necessary.

The site automatically uses a recognized poster as the event thumbnail and displays it without cropping. If no poster exists, the first supported photograph becomes the cover. A poster-only event has no Photos button. Any supported image that is not named `00-poster` or `poster` (before the extension) is considered an album photo. The poster itself is excluded from the album.

The Photos button automatically appears when actual photos are present. It opens a full-browser-window viewer with Previous/Next arrows, a counter, keyboard arrow controls, mobile swipe gestures, and an Open original link. Close with the X or Escape. No HTML or JavaScript editing is required for new albums.

To add photos later, upload them to the existing event folder. To replace a poster, upload a correctly formatted image with the same filename. If changing extensions, delete the old poster to prevent duplicates. To change the display order, rename the photos (or download and re-upload under new names, then delete the old copies). To delete a photo, open it in GitHub, select the three-dot menu → Delete file, and commit. Upload any relocated photographs to their correct new folder before deleting the old copies.

For performance, aim for a longest edge around 1600–2000 pixels and ideally less than 1 MB per photo. Do not upscale low-resolution images. Preserve readable poster text and original aspect ratios. Only publish photographs you have permission to share publicly; consider removing embedded GPS metadata. Git history may retain deleted files, so do not upload sensitive images in the first place.

### The Photos page (all events)

The navigation link **Photos** opens `photos.html`, an automatically compiled gallery of photographs from every event listed in `_data/past_events.yml`. It uses the same original files as the individual event albums, excludes `00-poster` and `poster` images, and orders events newest first and images alphabetically within each event. No separate photo folder or gallery data file is needed. Click any thumbnail to open the full-window viewer at that image, then use arrows, keyboard, or swipe to browse across the entire collection. Thumbnails may crop to fit the grid; the viewer shows the full image. Adding or deleting photos in an archived event folder updates both pages on the next successful GitHub Pages build. An event needs a matching YAML entry before its photos appear. The homepage Explore Our Events button opens the dedicated Events page.

## 6. Current archive example (November 2026)

```text
_data/
    past_events.yml
assets/
    events/
        forest-ology-markworth-state-forest/
            00-poster.png
        forest-ology-tiger-mountain/
            00-poster.png
            01.jpg
            02.jpg
            03.jpg
            04.jpg
            05.jpg
        law-firm-climate-scorecard/
            00-poster.jpg
        trail-mixer/
            00-poster.jpg
    logo_no_background.png
    snow_lake.jpeg
```

The May 9 Tiger Mountain event has five photographs. The November 14 Marckworth hike, November 18 Climate Scorecard presentation, and November 19 Trail Mixer currently have posters only. The Marckworth folder ID intentionally uses `markworth` without the `c`; the public title uses `Marckworth`. Leave the ID and folder spelling consistent.

## 7. Website files and what they do

| File or folder | Purpose |
| --- | --- |
| `index.html` | Homepage introduction, upcoming calendar, Get Involved |
| `about.html` | Club story, mission, field trips, membership and involvement |
| `events.html` | Upcoming calendar, Jekyll-generated past events, photo viewer markup |
| `photos.html` | Automatically compiled all-event photo gallery |
| `photos.css` | Photo grid styling |
| `styles.css` | Shared design, navigation, typography, responsive styling and cabin animation |
| `events.css` | Past event cards and full-window viewer styling |
| `script.js` | Upcoming event data, shared calendar logic and loading screen behavior |
| `event-photos.js` | Photo viewer navigation and interactions |
| `_data/past_events.yml` | Past event metadata |
| `assets/events/` | Individual event image folders |
| `assets/logo_no_background.png` | Navbar logo |
| `assets/snow_lake.jpeg` | Hero background photograph |
| `_config.yml` | Jekyll and GitHub Pages configuration |
| `.gitignore` | Git exclusions |
| `README.md` | This maintenance guide |

For routine event updates, edit only `script.js`, `_data/past_events.yml`, and the relevant event image folders. Preserve the two `---` lines at the very beginning of `events.html` and `photos.html`: Jekyll needs that front matter to process the archive. Do not add a `.nojekyll` file or disable Jekyll processing. Leave the animated cabin and shared page structure alone unless a redesign is intended.

Contact details and Instagram links are repeated in the HTML files. If they change, update all four pages; the calendar's listserv fallback link is also in `script.js`. Update this README as well. The website currently uses `thelodge@uw.edu`; older event flyers show `legallodge@uw.edu`. Confirm the preferred club mailbox internally before changing the live contact links.

## 8. Backups and recovering from mistakes

Before major changes, create a backup branch: from the repository's branch selector, type a unique name such as `backup-2027-01-15`, then choose Create branch from `main`. Switch back to `main` before making live edits. GitHub retains previous commits, and an administrator can revert unwanted changes. If Pages deploys from a branch, Settings → Pages lets an authorized administrator switch the publishing branch to a backup, then back to `main`. The public URL stays the same. Avoid deleting the backup branch until it is no longer needed.

To download a snapshot for review, use the green Code button → Download ZIP on the desired branch. This includes the folder structure but not the full Git history. Keep any local copies secure.

## 9. Troubleshooting

| Problem | Check |
| --- | --- |
| Site appears unchanged | Confirm the commit is on the publishing branch; check Actions for a successful Pages deployment; hard-refresh. |
| Entire archive is empty | Check that `_data/past_events.yml` is in the correct folder, contains entries instead of `[]`, and uses valid YAML indentation. |
| Event appears but poster is missing | Confirm exact ID/folder match, supported image format, and that the image was committed. |
| Wrong poster | Open the actual image in the event folder; replace it with the correct artwork and remove duplicate posters. |
| Photos button missing | Upload actual supported images to that event folder; a poster alone intentionally does not create a button. |
| Photos page missing an image | Verify the event is listed in YAML, the folder ID matches, the image is supported and not named as a poster, and Pages has rebuilt. |
| Wrong photos or duplicates | Remove misplaced files from the wrong folder after verifying their correct copies. Uploading a new ZIP's contents does not delete obsolete files. |
| Calendar blank or broken | Check the `events` array for missing commas, quotation marks, brackets, or invalid dates. Restore the last working version if needed. |
| Raw Liquid template text appears | Confirm Jekyll is enabled and `events.html` and `photos.html` begin with the required front matter. |
| Instagram opens the wrong profile | Verify the URL and displayed handle in all four HTML footers. |
| GitHub will not upload a folder | Use the `.gitkeep` method in section 4, then upload the individual images. |

After publishing, visit the homepage, About Us, Events, and Photos pages. Verify the nav, calendar, listserv, email, Instagram, poster associations and photo viewer on desktop and mobile. Check that poster-only cards have no Photos button. For a development review, a fresh repository ZIP is useful, but a deployed browser test is still needed to verify the final rendered site.
