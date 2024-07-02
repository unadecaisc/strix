<script>
  import { onMount } from "svelte";
</script>

<button
  class="btn btn-primary"
  data-bs-toggle="modal"
  data-bs-target="#modal-mailinglist"
>
  Create mailing list
</button>

<div class="modal fade" id="modal-mailinglist" data-bs-backdrop="static">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Create mailing list</h5>
        <button class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <form id="createUserForm">
          <div class="mb-3">
            <label for="name" class="form-label">List Name</label>
            <input
              type="text"
              id="name"
              name="name"
              class="form-control"
              required
            />
          </div>

          <div class="Email">
            <label for="email" class="form-label">Email</label>
            <select id="domain" class="form-select mt-2">
              <option value="@gmail.com">@gmail.com</option>
              <option value="@hotmail.com">@hotmail.com</option>
              <option value="@unadeca.net">@unadeca.net</option>
            </select>
          </div>

          <div class="paswword">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              class="form-control"
              required
            />
          </div>

          <div class="">
            <label for="confirmPassword" class="form-label"
              >Confirm Password</label
            >
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              class="form-control"
              required
            />
          </div>

          <div class="Confirm Password">
            <label for="access" class="form-label">Access</label>
            <select id="access" name="access" class="form-select">
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary">Create mailing list</button>
      </div>
    </div>
  </div>
</div>
