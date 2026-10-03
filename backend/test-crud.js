async function testUpdate() {
    try {
        // First, get all blogs
        const response = await fetch("http://localhost:3000/blogs");
        const blogs = await response.json();

        if (blogs.length === 0) {
            console.log("No blogs found. Create a test blog first.");
            return;
        }

        // Select the first blog
        const blog = blogs[0];

        console.log("Blog before update:", blog);

        // Update the selected blog
        const updateResponse = await fetch(
            `http://localhost:3000/blogs/${blog._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: "Updated Test Blog",
                    category: blog.category,
                    content: blog.content
                })
            }
        );

        const result = await updateResponse.json();

        console.log("Update status:", updateResponse.status);
        console.log("Update result:", result);
    } catch (error) {
        console.log("Error:", error.message);
    }
}

testUpdate();
async function testDelete() {
    try {
        // Get all blogs
        const response = await fetch("http://localhost:3000/blogs");
        const blogs = await response.json();

        if (blogs.length === 0) {
            console.log("No blogs found.");
            return;
        }

        // Find only the test blog we created/updated
        const blog = blogs.find(
            blog => blog.title === "Updated Test Blog"
        );

        if (!blog) {
            console.log("Test blog not found. Nothing deleted.");
            return;
        }

        console.log("Blog to delete:", blog.title, blog._id);

        // Delete the test blog
        const deleteResponse = await fetch(
            `http://localhost:3000/blogs/${blog._id}`,
            { method: "DELETE" }
        );

        const result = await deleteResponse.json();

        console.log("Delete status:", deleteResponse.status);
        console.log("Delete result:", result);
    } catch (error) {
        console.log("Error:", error.message);
    }
}

testDelete();