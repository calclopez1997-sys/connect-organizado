import os
from playwright.sync_api import sync_playwright, Page, expect

def run_verification(page: Page):
    # Get the absolute path to the index.html file
    current_dir = os.path.abspath(os.path.dirname(__file__))
    # Go up two levels to the root of the repo
    repo_root = os.path.abspath(os.path.join(current_dir, '..', '..'))
    index_path = os.path.join(repo_root, 'index.html')

    # 1. Navigate to the local index.html file
    page.goto(f'file://{index_path}')

    # 2. Log in
    login_form = page.locator("#loginForm")
    login_form.get_by_placeholder("correo@ejemplo.com").fill("test@example.com")
    login_form.get_by_placeholder("••••••••").fill("password")
    login_form.get_by_role("button", name="Iniciar Sesión").click()

    # Expect the main app container to be visible
    expect(page.locator("#appContainer")).to_be_visible()

    # Wait for the navigation menu to be ready
    page.wait_for_selector(".nav-menu")

    # 3. Navigate to the "Notas Rápidas" page
    notes_link = page.get_by_role("link", name="Notas Rápidas")
    notes_link.scroll_into_view_if_needed()
    notes_link.click()
    expect(page.locator("#notes")).to_be_visible()

    # 4. Open a note to verify the delete button
    # Click the first note in the grid
    first_note = page.locator('.note[data-note-id="2"]')
    first_note.click()

    # Expect the edit modal to be visible
    edit_modal = page.locator("#editNoteModal")
    expect(edit_modal).to_be_visible()

    # Take a screenshot to show the new "Eliminar Nota" button
    edit_modal.screenshot(path="jules-scratch/verification/delete_button_verification.png")

    # 5. Click the "Eliminar Nota" button and verify deletion
    page.locator("#deleteNoteBtn").click()

    # Expect the modal to be hidden
    expect(edit_modal).not_to_be_visible()

    # Expect the note to be removed from the grid
    expect(first_note).not_to_be_visible()
    page.screenshot(path="jules-scratch/verification/note_deleted_verification.png")

    # 6. Open the AI assistant
    page.locator("#ai-fab").click()
    ai_assistant = page.locator("#ai-assistant")
    expect(ai_assistant).to_be_visible()
    ai_assistant.screenshot(path="jules-scratch/verification/ai_assistant_open.png")

    # 7. Send a message and get a response
    page.get_by_placeholder("Pregúntame algo...").fill("hola")
    page.locator(".ai-send-btn").click()

    # Wait for the AI response
    expect(page.locator(".ai-message.ai-message")).to_be_visible()

    # Take a final screenshot
    ai_assistant.screenshot(path="jules-scratch/verification/ai_assistant_response.png")


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    run_verification(page)
    browser.close()

print("Verification script executed successfully.")