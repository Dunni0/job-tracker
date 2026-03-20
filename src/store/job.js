export async function getAllJobs() {
  const res = await fetch("/api/jobs");
    if (res.status === 401) {
    window.location.href = "/login";
    return;
  }
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}

export async function createJob(data) {
  const res = await fetch("/api/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
    if (res.status === 401) {
    window.location.href = "/login";
    return;
  }
  if (!res.ok) throw new Error("Failed to create job");
  return res.json();
}

export async function updateJob(id, data) {
  const res = await fetch(`/api/jobs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
    if (res.status === 401) {
    window.location.href = "/login";
    return;
  }
  if (!res.ok) throw new Error("Failed to update job");
  return res.json();
}

export async function deleteJob(id) {
  const res = await fetch(`/api/jobs/${id}`, {
    method: "DELETE",
  });
    if (res.status === 401) {
    window.location.href = "/login";
    return;
  }
  if (!res.ok) throw new Error("Failed to delete job");
  return res.json();
}